/// <reference types="passport" />
import type { Request } from "express";
export declare class GoogleController {
    googleLogin(req: Request): Promise<Express.User | undefined>;
    googleRedirect(req: Request): Promise<Express.User | undefined>;
}
//# sourceMappingURL=google.controller.d.ts.map