import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/user/entities/user.entity";
import { ChannelUtilities } from "./channel.utilities";
import * as bcrypt from "bcrypt";
import { ChannelStatus } from "@prisma/client";
import { UpdateChannelDto } from "./dto/update-channel.dto";

export type MutedPlayer = {
	timeout: NodeJS.Timeout;
	channel: string;
};

@Injectable()
export class ChannelService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly channelUtilities: ChannelUtilities
	) {}

	mutedUsers: Map<string, MutedPlayer[]> = new Map();

	async create(createChannelDto: CreateChannelDto, user: User) {
		await this.channelUtilities.checkChannelNameAvailability(createChannelDto.name);
		await this.channelUtilities.validateChannelPassword(
			createChannelDto.status,
			createChannelDto.password
		);

		const { password, ...otherInfo } = createChannelDto;

		return this.prisma.channel.create({
			data: {
				...otherInfo,
				password: password ? await bcrypt.hash(password, 10) : undefined,
				owner: {
					connect: {
						username: user.username,
					},
				},
			},
			select: this.channelUtilities.formatChannelResult(),
		});
	}

	async findAll() {
		return await this.prisma.channel.findMany({
			where: {
				NOT: {
					status: ChannelStatus.PRIVATE,
				},
			},
			select: this.channelUtilities.formatChannelResult(),
		});
	}

	async findInvited(username: string) {
		return await this.prisma.channel.findMany({
			where: {
				AND: [
					{ status: ChannelStatus.PRIVATE },
					{ invited: { some: { username } } },
					{ members: { none: { userId: username } } },
				],
			},
			select: this.channelUtilities.formatChannelResult(),
		});
	}

	async findUserChannels(username: string) {
		const result = await this.prisma.channel.findMany({
			where: {
				members: {
					some: { user: { username } },
				},
			},
			select: this.channelUtilities.formatChannelResult(),
		});

		return result;
	}

	async findOne(id: string) {
		const channelResult = await this.prisma.channel.findUnique({
			where: { name: id },
			select: this.channelUtilities.formatChannelResult(),
		});

		if (!channelResult)
			throw new HttpException("No such channel with that name!", HttpStatus.BAD_REQUEST);

		return channelResult;
	}

	async findJoinableChannels(username: string) {
		return await this.prisma.channel.findMany({
			where: {
				NOT: {
					status: ChannelStatus.PRIVATE,
				},
				members: {
					none: { userId: username },
				},
			},
			select: this.channelUtilities.formatChannelResult(),
		});
	}

	async search(name: string) {
		return this.prisma.channel.findMany({
			where: {
				name: {
					contains: name,
					mode: "insensitive",
				},
			},
			select: this.channelUtilities.formatChannelResult(),
		});
	}

	async update(id: string, updateChannelDto: UpdateChannelDto, username: string) {
		const channelResult = await this.prisma.channel.findUnique({
			where: { name: id },
			include: { owner: true }, // Include owner data for comparison
		});

		if (!channelResult) {
			throw new HttpException("No such channel with that name!", HttpStatus.BAD_REQUEST);
		}

		if (channelResult.owner.username !== username) {
			throw new HttpException("You're not the owner of the channel", HttpStatus.BAD_REQUEST);
		}

		if (
			updateChannelDto.status === ChannelStatus.PROTECTED &&
			(!updateChannelDto.password || !updateChannelDto.password.length)
		) {
			throw new HttpException(
				"Password must be set for protected channels.",
				HttpStatus.BAD_REQUEST
			);
		}

		if (
			(!updateChannelDto.status || updateChannelDto.status === ChannelStatus.PUBLIC) &&
			updateChannelDto.password
		) {
			throw new HttpException(
				"No password is required for public channels.",
				HttpStatus.BAD_REQUEST
			);
		}

		if (updateChannelDto.name && updateChannelDto.name !== id) {
			await this.channelUtilities.checkChannelNameAvailability(updateChannelDto.name);
		}

		const { password, ...otherInfo } = updateChannelDto;

		return this.prisma.channel.update({
			where: { name: id },
			data: {
				...otherInfo,
				password: password ? await bcrypt.hash(password, 10) : undefined,
				owner: {
					connect: {
						username,
					},
				},
			},
			select: this.channelUtilities.formatChannelResult(),
		});
	}

	async delete(id: string, username: string) {
		const channelResult = await this.prisma.channel.findUnique({
			where: { name: id },
			include: { owner: true, members: true },
		});

		if (!channelResult) {
			throw new HttpException("No such channel with that name!", HttpStatus.BAD_REQUEST);
		}

		if (channelResult.owner.username !== username) {
			throw new HttpException("You're not the owner of the channel", HttpStatus.BAD_REQUEST);
		}

		const result = await this.prisma.channel.delete({
			where: {
				name: id,
			},
			select: {
				name: true,
				createdAt: true,
				updatedAt: true,
				status: true,
				topic: true,
				owner: {
					select: {
						username: true,
						nickname: true,
						avatar: true,
					},
				},
			},
		});

		return {
			...result,
			members: channelResult.members,
		};
	}
}
