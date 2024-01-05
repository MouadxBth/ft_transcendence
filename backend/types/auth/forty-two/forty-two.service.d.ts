import { UserService } from "src/user/user.service";
import z from "zod";
declare const profileSchema: z.ZodObject<{
    username: z.ZodString;
    _json: z.ZodObject<{
        image: z.ZodObject<{
            link: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            link?: string | undefined;
        }, {
            link?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        image: {
            link?: string | undefined;
        };
    }, {
        image: {
            link?: string | undefined;
        };
    }>;
    name: z.ZodOptional<z.ZodObject<{
        givenName: z.ZodOptional<z.ZodString>;
        familyName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        givenName?: string | undefined;
        familyName?: string | undefined;
    }, {
        givenName?: string | undefined;
        familyName?: string | undefined;
    }>>;
    displayName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    _json: {
        image: {
            link?: string | undefined;
        };
    };
    displayName: string;
    name?: {
        givenName?: string | undefined;
        familyName?: string | undefined;
    } | undefined;
}, {
    username: string;
    _json: {
        image: {
            link?: string | undefined;
        };
    };
    displayName: string;
    name?: {
        givenName?: string | undefined;
        familyName?: string | undefined;
    } | undefined;
}>;
type UserProfile = z.infer<typeof profileSchema>;
export declare class FortyTwoService {
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
    }>;
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
//# sourceMappingURL=forty-two.service.d.ts.map