import { IsNotEmpty, IsString } from "class-validator";


export class AdminOperationsDto {

    @IsString()
    @IsNotEmpty()
    member: string;

    @IsString()
    @IsNotEmpty()
    channel: string;
}