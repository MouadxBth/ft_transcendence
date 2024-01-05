import { UserService } from "src/user/user.service";
import z from "zod";
declare const profileSchema: z.ZodObject<{
    id: z.ZodString;
    displayName: z.ZodString;
    photos: z.ZodArray<z.ZodObject<{
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
    }, {
        value: string;
    }>, "many">;
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
}, "strip", z.ZodTypeAny, {
    id: string;
    displayName: string;
    photos: {
        value: string;
    }[];
    name?: {
        givenName?: string | undefined;
        familyName?: string | undefined;
    } | undefined;
}, {
    id: string;
    displayName: string;
    photos: {
        value: string;
    }[];
    name?: {
        givenName?: string | undefined;
        familyName?: string | undefined;
    } | undefined;
}>;
type UserProfile = z.infer<typeof profileSchema>;
export declare class GoogleService {
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
//# sourceMappingURL=google.service.d.ts.map