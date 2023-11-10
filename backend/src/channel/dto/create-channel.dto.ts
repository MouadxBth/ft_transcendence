import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ChannelStatus } from "../enums/channel-status.enum";

export class CreateChannelDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsOptional()
	password: string;

	@IsEnum(ChannelStatus)
	@IsNotEmpty()
	status: ChannelStatus = ChannelStatus.PUBLIC;

	@IsString()
	@IsOptional()
	topic: string;

	@IsString()
	@IsNotEmpty()
	owner: string;
}
