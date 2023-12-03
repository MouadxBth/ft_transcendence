import { IsNotEmpty, IsOptional, IsString } from "class-validator";



export class JoinChannelDto {
    @IsString()
    @IsNotEmpty()
    channel: string;

    @IsString()
    @IsOptional()
    password?: string | null;
} 