import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum ChannelStatus
{
    PUBLIC =  "PUBLIC",
    PRIVATE = "PRIVATE",
    PROTECTED = "PROTECTED",
}
export class CreateChannelDto {
   @IsString()
   @IsNotEmpty()
   name: string; 

   @IsString()
   @IsOptional()
   password: string;

   @IsEnum(ChannelStatus)
   @IsNotEmpty()
   status: ChannelStatus;

   @IsString()
   @IsOptional()
   topic: string;

   @IsString()
   @IsNotEmpty()
   owner: string;
}