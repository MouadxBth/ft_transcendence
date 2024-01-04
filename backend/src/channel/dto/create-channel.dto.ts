import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ChannelStatus } from "../enums/channel-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateChannelDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: "channel" })
	name: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "password" })
	password?: string;

	@IsEnum(ChannelStatus)
	@IsOptional()
	@ApiProperty({ enum: ChannelStatus, example: ChannelStatus.PRIVATE })
	status?: ChannelStatus;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "a channel's topic" })
	topic?: string;
}
