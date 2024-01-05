import { CanActivate, ExecutionContext } from "@nestjs/common";
declare const GoogleGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogleGuard extends GoogleGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
//# sourceMappingURL=google.guard.d.ts.map