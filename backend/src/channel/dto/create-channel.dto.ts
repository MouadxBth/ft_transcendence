import { IsEnum, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { ChannelStatus } from "../enums/channel-status.enum";
import { ApiProperty } from "@nestjs/swagger";
import { OwnerExistsRule } from "../rules/owner-exists.rule";

export class CreateChannelDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: "channel" })
	name: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "password" })
	password: string;

	@IsEnum(ChannelStatus)
	@IsOptional()
	@ApiProperty({ enum: ChannelStatus, example: ChannelStatus.PRIVATE })
	status: ChannelStatus;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "a channel's topic" })
	topic: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: "owner" })
	@Validate(OwnerExistsRule)
	owner: string;
}
