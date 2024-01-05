import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";
export declare class AuthService {
    private readonly configService;
    constructor(configService: ConfigService);
    logout(request: Request, response: Response): string;
}
//# sourceMappingURL=auth.service.d.ts.map