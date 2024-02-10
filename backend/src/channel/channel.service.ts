import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { ChannelStatus } from "./enums/channel-status.enum";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class ChannelService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createChannelDto: CreateChannelDto, user: User) {
		const channelResult = await this.prisma.channel.findUnique({
			where: { name: createChannelDto.name },
		});

		if (channelResult)
			throw new HttpException("Channel name already taken!", HttpStatus.BAD_REQUEST);

		if (
			createChannelDto.status === ChannelStatus.PROTECTED &&
			(!createChannelDto.password || !createChannelDto.password.length)
		)
			throw new HttpException(
				"Password must be set for protected channels.",
				HttpStatus.BAD_REQUEST
			);

		if (
			(!createChannelDto.status || createChannelDto.status === ChannelStatus.PUBLIC) &&
			createChannelDto.password
		)
			throw new HttpException(
				"No password is required for public channels.",
				HttpStatus.BAD_REQUEST
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
				members: {
					select: {
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
			},
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
				members: {
					select: {
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
			},
		});
	}

	async findAll() {
		return await this.prisma.channel.findMany({
			where: {
				NOT: {
					status: ChannelStatus.PRIVATE,
				},
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
				members: {
					select: {
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
			},
		});
	}

	async findOne(id: string) {
		const channelResult = await this.prisma.channel.findUnique({
			where: { name: id },
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
				members: {
					select: {
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
			},
		});

		if (!channelResult)
			throw new HttpException("No such channel with that name!", HttpStatus.BAD_REQUEST);

		return channelResult;
	}

	async findUserChannels(username: string) {
		const result = await this.prisma.channel.findMany({
			where: {
				members: {
					some: {
						user: {
							username,
						},
					},
				},
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
				members: {
					select: {
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
			},
		});

		return result;
	}

	async update(id: string, updateChannelDto: UpdateChannelDto, user: User) {
		const channelResult = await this.prisma.channel.findUnique({ where: { name: id } });

		if (!channelResult)
			throw new HttpException("No such channel with that name!", HttpStatus.BAD_REQUEST);

		if (channelResult.ownerId != user.username)
			throw new HttpException("You're not the owner of the channel", HttpStatus.BAD_REQUEST);

		if (
			updateChannelDto.status === ChannelStatus.PROTECTED &&
			(!updateChannelDto.password || !updateChannelDto.password.length)
		)
			throw new HttpException(
				"Password must be set for protected channels.",
				HttpStatus.BAD_REQUEST
			);

		if (
			(!updateChannelDto.status || updateChannelDto.status === ChannelStatus.PUBLIC) &&
			updateChannelDto.password
		)
			throw new HttpException(
				"No password is required for public channels.",
				HttpStatus.BAD_REQUEST
			);

		if (updateChannelDto.name) {
			const ownedChannel = await this.prisma.channel.findUnique({
				where: { name: updateChannelDto.name },
			});

			if (ownedChannel)
				throw new HttpException("Channel name already taken!", HttpStatus.BAD_REQUEST);
		}
		const { password, ...otherInfo } = updateChannelDto;

		return await this.prisma.channel.update({
			where: { name: id },
			data: {
				...otherInfo,
				password: password ? await bcrypt.hash(password, 10) : undefined,
				owner: {
					connect: {
						username: user.username,
					},
				},
			},
		});
	}

	async remove(id: string, username: string) {
		// add ownership checks
		const channelResult = await this.findOne(id);

		console.log("HHH", channelResult);

		if (!channelResult)
			throw new HttpException("No such channel with that name!", HttpStatus.BAD_REQUEST);

		if (channelResult.owner.username != username)
			throw new HttpException("You're not the owner of the channel", HttpStatus.BAD_REQUEST);

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
