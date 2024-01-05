import { Profile } from "passport";
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-google-oauth20";
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly googleService;
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
    } | null>;
}
export {};
//# sourceMappingURL=google.strategy.d.ts.map