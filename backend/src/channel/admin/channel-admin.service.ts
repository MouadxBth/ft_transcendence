import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminOperationsDto } from "../dto/admin-operations.dto";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class ChannelAdminService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService
	) {}

	private async verifyOperation(user: User, dto: AdminOperationsDto, fetchMember: boolean) {
		const channelResult = await this.prisma.channel.findUnique({
			where: {
				name: dto.channel,
			},
			select: {
				name: true,
				ownerId: true,
				members: {
					select: {
						id: true,
						userId: true,
						admin: true,
						muted: true,
					},
				},
				banned: {
					select: {
						username: true,
					},
				},
				invited: {
					select: {
						username: true,
					},
				},
			},
		});

		if (!channelResult) throw new HttpException("No such channel!", HttpStatus.BAD_REQUEST);

		const adminResult = channelResult.members.find((member) => member.userId == user.username);
		if ((!adminResult || !adminResult.admin) && user.username !== channelResult.ownerId)
			throw new HttpException(
				"Permission denied, user isn't admin/owner in the channel",
				HttpStatus.BAD_REQUEST
			);

		const member = channelResult.members.find((member) => member.userId == dto.member);
		// const caller = arguments.callee.caller.name;
		// if (!member && caller !== "unban")
		if (!member && fetchMember === true)
			throw new HttpException(
				"Target user of the operation is not a member of the channel!",
				HttpStatus.BAD_REQUEST
			);
		if (member && member.admin === true)
			throw new HttpException(
				"This operation cannot be performed on an admin",
				HttpStatus.BAD_REQUEST
			);

		return { channelResult, adminResult, member };
	}

	async kick(user: User, dto: AdminOperationsDto) {
		const result = await this.verifyOperation(user, dto, true);

		return await this.prisma.channelMember.delete({
			where: {
				id: result.member!.id,
			},
		});
	}

	async mute(user: User, dto: AdminOperationsDto) {
		const result = await this.verifyOperation(user, dto, true);

		if (result.member?.muted)
			throw new HttpException("Member is already muted!", HttpStatus.BAD_REQUEST);

		return await this.prisma.channelMember.update({
			where: {
				id: result.member!.id,
			},
			data: {
				muted: true,
			},
		});
	}

	async unmute(user: User, dto: AdminOperationsDto) {
		const result = await this.verifyOperation(user, dto, true);

		if (!result.member!.muted)
			throw new HttpException("Target user is not muted to be unmuted!", HttpStatus.BAD_REQUEST);

		return await this.prisma.channelMember.update({
			where: {
				id: result.member!.id,
			},
			data: {
				muted: false,
			},
		});
	}

	async ban(user: User, dto: AdminOperationsDto) {
		const result = await this.verifyOperation(user, dto, true);

		const banned = result.channelResult.banned.find((banned) => banned.username === dto.member);

		if (banned) throw new HttpException("Target user is already banned!", HttpStatus.BAD_REQUEST);
		const update = await this.prisma.channel.update({
			where: {
				name: result.channelResult.name,
			},
			data: {
				banned: {
					connect: {
						username: result.member!.userId,
					},
				},
			},
		});
		if (!update) return { banned: false };
		return { banned: true };
	}

	async unban(user: User, dto: AdminOperationsDto) {
		const result = await this.verifyOperation(user, dto, true);

		const banned = result.channelResult.banned.find((member) => member.username == dto.member);
		if (!banned)
			throw new HttpException("Target user is not banned to be unbanned!", HttpStatus.BAD_REQUEST);
		const update = await this.prisma.channel.update({
			where: {
				name: result.channelResult.name,
			},
			data: {
				banned: {
					disconnect: {
						username: dto.member,
					},
				},
			},
		});
		if (!update) return { banned: true };
		return { banned: false };
	}

	async invite(user: User, dto: AdminOperationsDto) {
		const result = await this.verifyOperation(user, dto, false);

		const userResult = await this.userService.findOne(dto.member);

		const invited = result.channelResult.invited.find((invited) => invited.username === dto.member);

		if (invited) throw new HttpException("User has already been invited!", HttpStatus.BAD_REQUEST);
		const update = await this.prisma.channel.update({
			where: {
				name: result.channelResult.name,
			},
			data: {
				invited: {
					connect: {
						username: userResult.username,
					},
				},
			},
		});
		if (!update) return { invited: false };
		return { invited: true };
	}
}
