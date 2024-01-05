import Strategy from "passport-42";
import { Profile } from "passport";
import { ConfigService } from "@nestjs/config";
declare const FortyTwoStrategy_base: new (...args: any[]) => Strategy;
export declare class FortyTwoStrategy extends FortyTwoStrategy_base {
    private readonly fortyTwoService;
    constructor(configService: ConfigService);
    validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<{
        username: string;
        password: string | null;
        firstTime: boolean;
        createdAt: Date;
        updatedAt: Date;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        twoFactorAuthenticationEnabled: boolean;
    }>;
}
export {};
//# sourceMappingURL=forty-two.strategy.d.ts.map