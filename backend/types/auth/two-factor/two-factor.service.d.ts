import { User } from "@prisma/client";
import { UserService } from "src/user/user.service";
import { type Request } from "express";
export declare class TwoFactorService {
    private readonly userService;
    constructor(userService: UserService);
    enableTwoFactorAuth(req: Request): Promise<{
        message: string;
        data: string;
    }>;
    disableTwoFactorAuth(req: Request): Promise<string>;
    isTwoFactorAuthenticationCodeValid(req: Request, twoFactorAuthenticationCode: string, sender: User): Promise<false | "2FA Code validated Successfully!">;
}
//# sourceMappingURL=two-factor.service.d.ts.map