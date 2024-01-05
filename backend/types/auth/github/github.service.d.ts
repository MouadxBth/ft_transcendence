import { UserService } from "src/user/user.service";
import z from "zod";
declare const profileSchema: z.ZodObject<{
    username: z.ZodString;
    photos: z.ZodArray<z.ZodObject<{
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
    }, {
        value: string;
    }>, "many">;
    displayName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    displayName: string;
    photos: {
        value: string;
    }[];
}, {
    username: string;
    displayName: string;
    photos: {
        value: string;
    }[];
}>;
type UserProfile = z.infer<typeof profileSchema>;
export declare class GithubService {
    private readonly userService;
    constructor(userService: UserService);
    validate(profile: unknown): Promise<{
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
    handleFirstTime(profile: UserProfile): Promise<{
        username: string;
        password: string | null;
        firstTime: boolean;
        createdAt: Date;
        updatedAt: Date;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        twoFactorAuthenticationEnabled: boolean;
        twoFactorAuthenticationSecret: string | null;
    }>;
}
export {};
//# sourceMappingURL=github.service.d.ts.map