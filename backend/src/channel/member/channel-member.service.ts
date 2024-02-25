import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JoinChannelDto } from "../dto/join-channel.dto";
import { ChannelStatus } from "../enums/channel-status.enum";
import * as bcrypt from "bcrypt";
import { ChannelService } from "../channel.service";

@Injectable()
export class ChannelMemberService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly channelService: ChannelService
	) {}

	async join(username: string, dto: JoinChannelDto) {
		const channelResult = await this.prisma.channel.findUnique({
			where: {
				name: dto.channel,
			},
			include: {
				members: {
					select: { userId: true },
				},
				banned: {
					select: { username: true },
				},
				invited: {
					select: { username: true },
				},
			},
		});

		if (!channelResult) throw new HttpException("No such channel!", HttpStatus.BAD_REQUEST);

		const banned = channelResult.banned.find((banned) => banned.username === username);
		if (banned) throw new HttpException("User is banned!", HttpStatus.BAD_REQUEST);

		const member = channelResult.members.find((member) => member.userId === username);
		if (member) throw new HttpException("User is a already a member!", HttpStatus.BAD_REQUEST);

		const invited = channelResult.invited.find((invited) => invited.username === username);
		if (
			!invited &&
			channelResult.status === ChannelStatus.PRIVATE &&
			channelResult.ownerId !== username
		)
			throw new HttpException(
				"Channel is private and user wasn't invited!",
				HttpStatus.BAD_REQUEST
			);

		if (channelResult.status === ChannelStatus.PROTECTED && channelResult.password) {
			if (!dto.password)
				throw new HttpException(
					"Channel is protected and no password was provided!",
					HttpStatus.BAD_REQUEST
				);
			const check = await bcrypt.compare(dto.password, channelResult.password);
			if (!check)
				throw new HttpException("Invalid credentials for the channel", HttpStatus.BAD_REQUEST);
		}

		// if the user was invited make sure to remove him from the invited arrays once they became a member
		if (invited && channelResult.status === ChannelStatus.PRIVATE)
			await this.prisma.channel.update({
				where: {
					name: channelResult.name,
				},
				data: {
					invited: {
						disconnect: { username: username },
					},
				},
			});

		return await this.prisma.channelMember.create({
			data: {
				user: {
					connect: { username: username },
				},
				channel: {
					connect: { name: dto.channel },
				},
				muted: this.channelService.mutedUsers.has(username)
			},
		});
	}

	async leave(username: string, channel: string) {
		const member = await this.prisma.channelMember.findFirst({
			where: {
				AND: [{ userId: username }, { channelId: channel }],
			},
		});
		if (!member) throw new HttpException("User isn't a member!", HttpStatus.BAD_REQUEST);

		return await this.prisma.channelMember.delete({
			where: {
				id: member.id,
			},
		});
	}

	async findAll(channel: string) {
		return await this.prisma.channelMember.findMany({
			where: {
				channelId: channel,
			},
		});
	}

	async findOne(channel: string, target: string) {
		const channelMemberResult = await this.prisma.channelMember.findFirst({
			where: {
				AND: [{ userId: target }, { channelId: channel }],
			},
		});
		if (!channelMemberResult)
			throw new HttpException("No such channel member found!", HttpStatus.BAD_REQUEST);
		return channelMemberResult;
	}
}
