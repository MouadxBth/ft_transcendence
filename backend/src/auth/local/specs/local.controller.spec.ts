import { Test, TestingModule } from "@nestjs/testing";
import { LocalController } from "../local.controller";
import { LocalService } from "../local.service";
import { User } from "@prisma/client";
import { Request } from "express";
import { createMock } from "@golevelup/ts-jest";

describe("LocalController", () => {
	let controller: LocalController;
	let service: LocalService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [LocalController],
			providers: [LocalService],
		})
			.useMocker(createMock)
			.compile();

		controller = module.get<LocalController>(LocalController);
		service = module.get<LocalService>(LocalService);
	});

	describe("localLogin", () => {
		it("should return the authenticated user profile on successful login", async () => {
			// Arrange
			const authenticatedUser = {
				username: "mbouthai",
				password: null,
				firstName: null,
				lastName: null,
				avatar: null,
				twoFactorAuthenticationEnabled: false,
			} as User;

			const req = createMock<Request>({
				user: authenticatedUser,
			});

			// Act
			const result = await controller.localLogin(req);

			// Assert
			expect(result).toBe(authenticatedUser);
		});

		it("should return undefined if the user is not authenticated", async () => {
			// Arrange
			const req = createMock<Request>({
				user: undefined,
			});

			// Act
			const result = await controller.localLogin(req);

			// Assert
			expect(result).toBe(undefined);
		});
	});

	describe("register", () => {
		it("should return the registered user on successful registration", async () => {
			// Arrange
			const createUserDto = {
				username: "mbouthai",
				password: "mbouthai",
			};

			const registeredUser = {
				username: "mbouthai",
				password: "mbouthai",
				firstName: null,
				lastName: null,
				avatar: null,
				twoFactorAuthenticationEnabled: false,
			} as User;

			const spy = jest.spyOn(service, "register").mockResolvedValueOnce(registeredUser);

			// Act
			const result = await controller.register(createUserDto);

			// Assert
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(createUserDto);
			expect(spy).toHaveBeenNthCalledWith(1, createUserDto);

			expect(result).toBe(registeredUser);
		});
	});
});
