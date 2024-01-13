// mockUser.middleware.ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class MockUserMiddleware implements NestMiddleware {
	use(req: any, res: any, next: () => void) {
		// Add a mock user to the request
		const user = {
			username: "owner",
			password: "password",
			avatar: "https://images/aatrox.jpeg",
		} as User;
		res;
		req.user = user;
		next();
	}
}
