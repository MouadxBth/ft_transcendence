import { CanActivate, ExecutionContext } from "@nestjs/common";
declare const GithubGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GithubGuard extends GithubGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
//# sourceMappingURL=github.guard.d.ts.map