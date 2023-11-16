import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
import { createMock } from "@golevelup/ts-jest";
import { Request, Response } from "express";
import passport from "passport";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("AuthService", () => {
	let authService: AuthService;
	let configService: ConfigService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService],
		})
			.useMocker(createMock)
			.compile();

		authService = module.get<AuthService>(AuthService);
		configService = module.get<ConfigService>(ConfigService);
	});

	it("(AuthService) should be defined", () => {
		expect(authService).toBeDefined();
	});

	it("(ConfigService) should be defined", () => {
		expect(configService).toBeDefined();
	});

	describe("invalidateSession", () => {
		it("should logout successfully", () => {
			const sessionName = "test";
			const request = createMock<Request>({
				session: {
					destroy: jest.fn(),
				},
			});
			const response = createMock<Response>();

			const requestSpy = jest.spyOn(request, "isAuthenticated").mockReturnValue(true);
			const responseSpy = jest.spyOn(response, "clearCookie");
			const configServiceGetSpy = jest.spyOn(configService, "get").mockReturnValueOnce(sessionName);

			const logOutOptions = { keepSessionInfo: false } as passport.LogOutOptions;

			const logOutSpy = jest.spyOn(request, "logOut");

			const result = authService.logout(request, response);

			expect(requestSpy).toHaveBeenCalledTimes(1);

			expect(configServiceGetSpy).toHaveBeenCalledTimes(1);
			expect(configServiceGetSpy).toHaveBeenNthCalledWith(1, "SESSION_NAME");

			expect(responseSpy).toHaveBeenCalledTimes(1);
			expect(responseSpy).toHaveBeenNthCalledWith(1, sessionName);

			expect(logOutSpy).toHaveBeenCalledTimes(1);
			expect(logOutSpy).toHaveBeenNthCalledWith(1, logOutOptions, expect.any(Function));

			expect(result).toEqual("Logged out");
		});

		it("should throw an exception if the user is not authenticated", () => {
			const request = createMock<Request>({
				session: {
					destroy: jest.fn(),
				},
			});
			const response = createMock<Response>();

			const requestSpy = jest.spyOn(request, "isAuthenticated").mockReturnValue(false);

			try {
				authService.logout(request, response);
				fail("Expecting an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe("You are not logged in!");
			}

			expect(requestSpy).toHaveBeenCalledTimes(1);
		});

		it("should throw an exception if it failed to logout", () => {
			const sessionName = "test";
			const request = createMock<Request>({
				session: {
					destroy: jest.fn(),
				},
			});
			const response = createMock<Response>();

			const requestSpy = jest.spyOn(request, "isAuthenticated").mockReturnValue(true);
			const responseSpy = jest.spyOn(response, "clearCookie");
			const configServiceGetSpy = jest.spyOn(configService, "get").mockReturnValueOnce(sessionName);

			const logOutOptions = { keepSessionInfo: false } as passport.LogOutOptions;

			const logOutSpy = jest
				.spyOn(request, "logOut")
				.mockImplementation((_options: passport.LogOutOptions, callback: (error: any) => void) => {
					callback(true);
				});

			try {
				authService.logout(request, response);
				fail("Expecting an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
				expect((exception as HttpException).message).toBe("Failed to log out");
			}

			expect(requestSpy).toHaveBeenCalledTimes(1);

			expect(configServiceGetSpy).toHaveBeenCalledTimes(1);
			expect(configServiceGetSpy).toHaveBeenNthCalledWith(1, "SESSION_NAME");

			expect(responseSpy).toHaveBeenCalledTimes(1);
			expect(responseSpy).toHaveBeenNthCalledWith(1, sessionName);

			expect(logOutSpy).toHaveBeenCalledTimes(1);
			expect(logOutSpy).toHaveBeenNthCalledWith(1, logOutOptions, expect.any(Function));
		});
	});
});
