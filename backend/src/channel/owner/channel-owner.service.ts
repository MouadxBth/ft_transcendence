import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminOperationsDto } from "../dto/admin-operations.dto";

@Injectable()
export class ChannelOwnerService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyOperation(username: string, dto: AdminOperationsDto) {
		const channelResult = await this.prisma.channel.findUnique({
			where: {
				name: dto.channel,
			},
			select: {
				ownerId: true,
				members: {
					select: {
						id: true,
						userId: true,
						admin: true,
					},
				},
			},
		});

		if (!channelResult) throw new HttpException("No such channel!", HttpStatus.BAD_REQUEST);

		if (username === dto.member)
			throw new HttpException("Cannot apply operation on yourself", HttpStatus.BAD_REQUEST);

		if (username !== channelResult.ownerId)
			throw new HttpException(
				"Permission denied, you are not the owner of channel",
				HttpStatus.BAD_REQUEST
			);

		const member = channelResult.members.find((member) => member.userId == dto.member);
		if (!member)
			throw new HttpException(
				"Target user of the operation is not a member of the channel!",
				HttpStatus.BAD_REQUEST
			);

		return { channelResult, member };
	}

	private formatChannelMember() {
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

	async promote(username: string, dto: AdminOperationsDto) {
		const result = await this.verifyOperation(username, dto);

		if (result.member.admin)
			throw new HttpException(
				"Target user of the operation is already admin!",
				HttpStatus.BAD_REQUEST
			);

		return await this.prisma.channelMember.update({
			where: {
				id: result.member.id,
			},
			data: {
				admin: true,
			},
			select: this.formatChannelMember(),
		});
	}

	async demote(username: string, dto: AdminOperationsDto) {
		const result = await this.verifyOperation(username, dto);

		if (!result.member.admin)
			throw new HttpException(
				"Target user of the operation is not an admin!",
				HttpStatus.BAD_REQUEST
			);

		return await this.prisma.channelMember.update({
			where: {
				id: result.member.id,
			},
			data: {
				admin: false,
			},
			select: this.formatChannelMember(),
		});
	}
}
