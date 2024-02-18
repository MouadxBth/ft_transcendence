import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ChannelStatus } from "./enums/channel-status.enum";

@Injectable()
export class ChannelUtilities {
	constructor(private readonly prisma: PrismaService) {}

	async checkChannelNameAvailability(name: string) {
		const channelResult = await this.prisma.channel.findUnique({
			where: { name },
		});
		if (channelResult) {
			throw new HttpException("Channel name already taken!", HttpStatus.BAD_REQUEST);
		}
	}

	async validateChannelPassword(status: ChannelStatus | undefined, password: string | undefined) {
		if (status === ChannelStatus.PROTECTED && (!password || !password.length)) {
			throw new HttpException(
				"Password must be set for protected channels.",
				HttpStatus.BAD_REQUEST
			);
		}

		if ((!status || status === ChannelStatus.PUBLIC) && password) {
			throw new HttpException(
				"No password is required for public channels.",
				HttpStatus.BAD_REQUEST
			);
		}
	}

	formatChannelResult() {
		return {
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
		};
	}
}
