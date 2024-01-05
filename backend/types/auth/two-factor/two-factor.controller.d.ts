import { TwoFactorService } from "./two-factor.service";
import { type Request } from "express";
import { TimeBasedOneTimePasswordDto } from "./dto/totp.dto";
export declare class TwoFactorController {
    private readonly twoFactorService;
    constructor(twoFactorService: TwoFactorService);
    twoFactorAuthentication(): Promise<string>;
    verifyTwoFactorAuthentication(req: Request, code: TimeBasedOneTimePasswordDto): Promise<false | "2FA Code validated Successfully!">;
    enableTwoFactorAuthentication(req: Request): Promise<{
        message: string;
        data: string;
    }>;
    disableTwoFactorAuthentication(req: Request): Promise<string>;
}
//# sourceMappingURL=two-factor.controller.d.ts.map