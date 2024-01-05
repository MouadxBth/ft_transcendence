import { PassportSerializer } from "@nestjs/passport";
export declare class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: (err: any, user: any) => void): any;
    deserializeUser(payload: any, done: (err: any, payload: string) => void): any;
}
//# sourceMappingURL=session.serializer.d.ts.map