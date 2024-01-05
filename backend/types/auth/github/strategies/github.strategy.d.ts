import { Profile } from "passport";
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-github2";
declare const GithubStrategy_base: new (...args: any[]) => Strategy;
export declare class GithubStrategy extends GithubStrategy_base {
    private readonly githubService;
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
//# sourceMappingURL=github.strategy.d.ts.map