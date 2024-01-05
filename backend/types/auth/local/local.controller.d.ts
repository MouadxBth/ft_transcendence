/// <reference types="passport" />
import { type Request } from "express";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LocalService } from "./local.service";
export declare class LocalController {
    private readonly localService;
    constructor(localService: LocalService);
    localLogin(req: Request): Promise<Express.User | undefined>;
    register(req: Request, dto: CreateUserDto): Promise<{
        username: string;
        firstTime: boolean;
        createdAt: Date;
        updatedAt: Date;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        twoFactorAuthenticationEnabled: boolean;
    }>;
}
//# sourceMappingURL=local.controller.d.ts.map