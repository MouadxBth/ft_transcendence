import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { type Request } from "express";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        username: string;
        firstTime: boolean;
        createdAt: Date;
        updatedAt: Date;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        twoFactorAuthenticationEnabled: boolean;
    }[]>;
    findOne(id: string): Promise<{
        username: string;
        firstTime: boolean;
        createdAt: Date;
        updatedAt: Date;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        twoFactorAuthenticationEnabled: boolean;
    }>;
    update(req: Request, id: string, updateUserDto: UpdateUserDto): Promise<{
        username: string;
        firstTime: boolean;
        createdAt: Date;
        updatedAt: Date;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        twoFactorAuthenticationEnabled: boolean;
    }>;
    remove(req: Request, id: string): Promise<{
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
//# sourceMappingURL=user.controller.d.ts.map