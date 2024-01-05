import { Strategy } from "passport-local";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly localService;
    validate(username: string, password: string): Promise<{
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
export {};
//# sourceMappingURL=local.strategy.d.ts.map