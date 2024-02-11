import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminOperationsDto } from "../dto/admin-operations.dto";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class ChannelOwnerService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyOperation(user: User, dto: AdminOperationsDto) {
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

		if (user.username !== channelResult.ownerId)
			throw new HttpException(
				"Permission denied, user isn't owner in the channel",
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

	async createAdmin(user: User, dto: AdminOperationsDto) {
		const result = await this.verifyOperation(user, dto);

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
		});
	}

	async removeAdmin(user: User, dto: AdminOperationsDto) {
		const result = await this.verifyOperation(user, dto);

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
		});
	}
}
