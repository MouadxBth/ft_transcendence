import { UserService } from "src/user/user.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { Request } from "express";
export declare class LocalService {
    private readonly userService;
    constructor(userService: UserService);
    validate(username: string, pass: string): Promise<{
        username: string;
        firstTime: boolean;
        createdAt: Date;
        updatedAt: Date;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        twoFactorAuthenticationEnabled: boolean;
    }>;
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
    hash(password: string, rounds: number): Promise<string>;
}
//# sourceMappingURL=local.service.d.ts.map