/// <reference types="passport" />
import { AuthService } from "./auth.service";
import type { Request, Response } from "express";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    profile(req: Request): Express.User | undefined;
    logout(request: Request, response: Response): any;
}
//# sourceMappingURL=auth.controller.d.ts.map