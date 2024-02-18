import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminOperationsDto } from "../dto/admin-operations.dto";
import { UserService } from "src/user/user.service";
import { ChannelAdminUtilities } from "./channel-admin.utilities";

@Injectable()
export class ChannelAdminService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly channelAdminUtilities: ChannelAdminUtilities
	) {}

	async kick(username: string, dto: AdminOperationsDto) {
		const result = await this.channelAdminUtilities.verifyOperation(username, dto, true);

		return await this.prisma.channelMember.delete({
			where: {
				id: result.member!.id,
			},
			select: this.channelAdminUtilities.formatMember(),
		});
	}

	async mute(username: string, dto: AdminOperationsDto) {
		const result = await this.channelAdminUtilities.verifyOperation(username, dto, true);

		if (result.member?.muted)
			throw new HttpException("Member is already muted!", HttpStatus.BAD_REQUEST);

		return await this.prisma.channelMember.update({
			where: {
				id: result.member!.id,
			},
			data: {
				muted: true,
			},
			select: this.channelAdminUtilities.formatMember(),
		});
	}

	async unmute(username: string, dto: AdminOperationsDto) {
		const result = await this.channelAdminUtilities.verifyOperation(username, dto, true);

		if (!result.member!.muted)
			throw new HttpException("Target user is not muted to be unmuted!", HttpStatus.BAD_REQUEST);

		return await this.prisma.channelMember.update({
			where: {
				id: result.member!.id,
			},
			data: {
				muted: false,
			},
			select: this.channelAdminUtilities.formatMember(),
		});
	}

	async ban(username: string, dto: AdminOperationsDto) {
		const result = await this.channelAdminUtilities.verifyOperation(username, dto, true);

		const banned = result.channelResult.banned.find((banned) => banned.username === dto.member);

		if (banned) throw new HttpException("Target user is already banned!", HttpStatus.BAD_REQUEST);

		await this.prisma.channelMember.delete({
			where: {
				id: result.member!.id,
			},
		});

		await this.prisma.channel.update({
			where: {
				name: result.channelResult.name,
			},
			data: {
				banned: {
					connect: {
						username: result.member!.user.username,
					},
				},
			},
		});
		return result.member;
	}

	async unban(username: string, dto: AdminOperationsDto) {
		const result = await this.channelAdminUtilities.verifyOperation(username, dto, false);

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

		if (!update) return { banned: false };

		return { banned: true };
	}

	async invite(username: string, dto: AdminOperationsDto) {
		const channelResult = await this.prisma.channel.findUnique({
			where: {
				name: dto.channel,
			},
			select: this.channelAdminUtilities.formatChannel(),
		});

		if (!channelResult) throw new HttpException("No such channel!", HttpStatus.BAD_REQUEST);

		const userResult = await this.userService.findOne(dto.member);

		const adminResult = channelResult.members.find((member) => member.user.username == username);
		if ((!adminResult || !adminResult.admin) && username !== channelResult.ownerId)
			throw new HttpException(
				"Permission denied! Only admins and above can invite another member",
				HttpStatus.BAD_REQUEST
			);

		const member = channelResult.members.find((member) => member.user.username == dto.member);

		if (member)
			throw new HttpException("User is already a member of the channel", HttpStatus.BAD_REQUEST);

		const invited = channelResult.invited.find((invited) => invited.username === dto.member);

		if (invited) throw new HttpException("User has already been invited!", HttpStatus.BAD_REQUEST);
		const update = await this.prisma.channel.update({
			where: {
				name: channelResult.name,
			},
			data: {
				invited: {
					connect: { username: userResult.username },
				},
			},
		});
		if (!update) return { invited: false };
		return { invited: true };
	}
}
