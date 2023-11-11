import { ApiProperty } from "@nestjs/swagger";
import { ChannelStatus } from "@prisma/client";

export class Channel {
	@ApiProperty({ example: "channel" })
	name: string;

	@ApiProperty({ example: "password", default: "" })
	password: string | null;

	@ApiProperty({ example: "a channel's topic" })
	topic: string | null;

	@ApiProperty({ enum: ChannelStatus })
	status: ChannelStatus;

	@ApiProperty({ example: "owner" })
	ownerId: string;
}
