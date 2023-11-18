import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { User } from "@prisma/client";
import { Request, Response } from "express";

describe("AuthController", () => {
	let controller: AuthController;
	let service: DeepMocked<AuthService>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
		})
			.useMocker(createMock)
			.compile();

		controller = module.get<AuthController>(AuthController);
		service = module.get(AuthService);
	});

	it("(AuthController) should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("(AuthService) should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("profile", () => {
		it("should return the user profile", () => {
			const user = {
				username: "mbouthai",
				password: null,
				firstName: null,
				lastName: null,
				avatar: null,
				twoFactorAuthenticationEnabled: false,
			} as User;

			const request = createMock<Request>({
				user: user,
			});

			const result = controller.profile(request);

			expect(result).toEqual(user);
		});

		it("should return undefined if the user is not authenticated", () => {
			const request = createMock<Request>({
				user: undefined,
			});

			const result = controller.profile(request);

			expect(result).toEqual(undefined);
		});
	});

	describe("logout", () => {
		it("should call authService.invalidateSession", () => {
			const request = createMock<Request>();
			const response = createMock<Response>();

			const invalidateSessionSpy = jest.spyOn(service, "logout").mockReturnValue("Logged Out");

			const result = controller.logout(request, response);

			expect(invalidateSessionSpy).toHaveBeenCalledWith(request, response);
			expect(result).toBe("Logged Out");
		});
	});
});
