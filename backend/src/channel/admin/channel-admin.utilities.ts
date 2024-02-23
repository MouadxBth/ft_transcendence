import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminOperationsDto } from "../dto/admin-operations.dto";

@Injectable()
export class ChannelAdminUtilities {
	constructor(private readonly prisma: PrismaService) {}

	formatMember() {
		return {
			id: true,
			admin: true,
			muted: true,
			user: {
				select: {
					username: true,
					nickname: true,
					avatar: true,
				},
			},
		};
	}

	formatChannel() {
		return {
			name: true,
			ownerId: true,
			members: {
				select: {
					id: true,
					admin: true,
					muted: true,
					user: {
						select: {
							username: true,
							nickname: true,
							avatar: true,
						},
					},
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
		};
	}

	async verifyOperation(username: string, dto: AdminOperationsDto, fetchMember: boolean) {
		const channelResult = await this.prisma.channel.findUnique({
			where: {
				name: dto.channel,
			},
			select: this.formatChannel(),
		});

		if (!channelResult) throw new HttpException("No such channel!", HttpStatus.BAD_REQUEST);

		if (username === dto.member)
			throw new HttpException("Cannot apply operation on yourself", HttpStatus.BAD_REQUEST);

		const adminResult = channelResult.members.find((member) => member.user.username == username);
		if ((!adminResult || !adminResult.admin) && username !== channelResult.ownerId)
			throw new HttpException("Permission denied!", HttpStatus.BAD_REQUEST);

		const member = channelResult.members.find((member) => member.user.username == dto.member);
		// const caller = arguments.callee.caller.name;
		// if (!member && caller !== "unban")
		if (!member && fetchMember === true)
			throw new HttpException(
				"Target user of the operation is not a member of the channel!",
				HttpStatus.BAD_REQUEST
			);

		console.log(member, channelResult);

		if (
			member &&
			(member.admin || member.user.username === channelResult.ownerId) &&
			username !== channelResult.ownerId
		)
			throw new HttpException(
				"This operation cannot be performed on an admin or above",
				HttpStatus.BAD_REQUEST
			);

		return { channelResult, adminResult, member };
	}
}
