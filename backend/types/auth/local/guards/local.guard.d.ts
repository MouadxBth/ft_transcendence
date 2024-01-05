import { CanActivate, ExecutionContext } from "@nestjs/common";
declare const LocalGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalGuard extends LocalGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
//# sourceMappingURL=local.guard.d.ts.map