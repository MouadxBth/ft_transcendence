import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { HttpException, HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { User } from "@prisma/client";
import passport from "passport";
import { AuthModule } from "src/auth/auth.module";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { PrismaService } from "src/prisma/prisma.service";
import request from "supertest";
import session from "express-session";
import { AuthService } from "src/auth/auth.service";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";

describe("AuthModule (E2E)", () => {
	let app: INestApplication;
	let prisma: DeepMocked<PrismaService>;
	let guard: DeepMocked<AuthenticatedGuard>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AuthModule],
		})
			.overrideGuard(AuthenticatedGuard)
			.useValue(createMock<AuthenticatedGuard>())
			.useMocker(createMock)
			.compile();

		app = moduleFixture.createNestApplication();

		app.use(passport.initialize());
		app.use(
			session({
				secret: "mouad",
				resave: false,
				saveUninitialized: false,
			})
		);
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

		prisma = app.get(PrismaService);
		guard = app.get(AuthenticatedGuard);

		await app.init();
	});

	it("(INestApplication) should be defined", () => {
		expect(app).toBeDefined();
	});

	it("(PrismaService) should be defined", () => {
		expect(prisma).toBeDefined();
	});

	it("(AuthenticatedGuard) should be defined", () => {
		expect(guard).toBeDefined();
	});

	describe("profile", () => {
		it("should return an empty object", () => {
			return request(app.getHttpServer()).get("/auth/profile").expect({});
		});
	});

	describe("logout", () => {
		it("should logout", async () => {
			const authService: DeepMocked<AuthService> = app.get(AuthService);

			jest.spyOn(authService, "logout").mockReturnValue("Logged out");

			jest.spyOn(guard, "canActivate").mockResolvedValueOnce(true);

			await request(app.getHttpServer()).post("/auth/logout").send().expect("Logged out");

			expect(authService.logout).toHaveBeenCalledWith(
				expect.objectContaining({
					isAuthenticated: expect.any(Function),
					logOut: expect.any(Function),
				}),
				expect.objectContaining({
					clearCookie: expect.any(Function),
				})
			);
		});

		it("should throw an exception saying not logged in", () => {
			jest.spyOn(guard, "canActivate").mockResolvedValueOnce(true);

			return request(app.getHttpServer())
				.post("/auth/logout")
				.send()
				.expect({ statusCode: HttpStatus.BAD_REQUEST, message: "You are not logged in!" });
		});

		it("should logout successfully", () => {
			const sessionName = "test";
			const request = createMock<Request>({
				session: {
					destroy: jest.fn(),
				},
			});

			const response = createMock<Response>();
			const authService: DeepMocked<AuthService> = app.get(AuthService);
			const configService: DeepMocked<ConfigService> = app.get(ConfigService);

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

		it("should throw an exception if it failed to logout", () => {
			const sessionName = "test";
			const request = createMock<Request>({
				session: {
					destroy: jest.fn(),
				},
			});
			const response = createMock<Response>();
			const authService: DeepMocked<AuthService> = app.get(AuthService);
			const configService: DeepMocked<ConfigService> = app.get(ConfigService);

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

	describe("Local", () => {
		const user = {
			username: "mbouthai",
			password: "$2a$10$PCSlWmzYc.jrD5.lgTJwbO9mm4diMkgz8gT3E4dpXFN7pNHhnk2hy",
		} as User;

		describe("Login (/auth/local/login)", () => {
			it("should login", () => {
				const payload = {
					username: "mbouthai",
					password: "mbouthai",
				};

				const { password, ...expectedValue } = user;

				jest.spyOn(guard, "canActivate").mockResolvedValueOnce(false);
				prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);

				return request(app.getHttpServer())
					.post("/auth/local/login")
					.send(payload)
					.expect(expectedValue);
			});

			it("should throw an exception saying invalid credentials", () => {
				const payload = {
					username: "mbouthai",
					password: "wrongPassword",
				};

				jest.spyOn(guard, "canActivate").mockResolvedValueOnce(false);
				prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);

				return request(app.getHttpServer())
					.post("/auth/local/login")
					.send(payload)
					.expect({ statusCode: HttpStatus.UNAUTHORIZED, message: "Invalid credentials!" });
			});

			it("should throw an exception saying unauthorized due to no password", () => {
				const payload = {
					username: "mbouthai",
				};

				jest.spyOn(guard, "canActivate").mockResolvedValueOnce(false);
				prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);

				return request(app.getHttpServer())
					.post("/auth/local/login")
					.send(payload)
					.expect({ message: "Unauthorized", statusCode: HttpStatus.UNAUTHORIZED });
			});

			it("should throw an exception saying unauthorized due to already authenticated", () => {
				const payload = {
					username: "mbouthai",
				};

				jest.spyOn(guard, "canActivate").mockResolvedValueOnce(true);
				prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);

				return request(app.getHttpServer())
					.post("/auth/local/login")
					.send(payload)
					.expect({ message: "Unauthorized", statusCode: HttpStatus.UNAUTHORIZED });
			});

			it("should throw an exception saying unauthorized due to no user found", () => {
				const payload = {
					username: "mbouthai",
				};

				jest.spyOn(guard, "canActivate").mockResolvedValueOnce(false);
				prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

				return request(app.getHttpServer())
					.post("/auth/local/login")
					.send(payload)
					.expect({ message: "Unauthorized", statusCode: HttpStatus.UNAUTHORIZED });
			});
		});
		describe("Register (/auth/local/register)", () => {
			it("should register a new user", () => {
				const payload = {
					username: "mbouthai",
					password: "mbouthai",
				};

				const { password, ...expectedValue } = user;

				prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);
				prisma.user.create = jest.fn().mockResolvedValueOnce(expectedValue);

				return request(app.getHttpServer())
					.post("/auth/local/register")
					.send(payload)
					.expect(expectedValue);
			});

			it("should throw an exception saying username already taken", () => {
				const payload = {
					username: "mbouthai",
					password: "mbouthai",
				};

				prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);

				return request(app.getHttpServer())
					.post("/auth/local/register")
					.send(payload)
					.expect({ statusCode: 400, message: "Username already taken!" });
			});

			it("should throw an exception due to username", () => {
				const payload = {
					// username: "mbouthai",
					// password: "mbouthai",
				};

				prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);

				return request(app.getHttpServer())
					.post("/auth/local/register")
					.send(payload)
					.expect({
						message: [
							"Username cannot contain whitespaces",
							"Username must be between 3 and 20 characters",
							"username should not be empty",
							"username must be a string",
						],
						error: "Bad Request",
						statusCode: HttpStatus.BAD_REQUEST,
					});
			});

			it("should throw an exception saying a password is required", () => {
				const payload = {
					username: "mbouthai",
				};

				prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);

				return request(app.getHttpServer()).post("/auth/local/register").send(payload).expect({
					statusCode: HttpStatus.BAD_REQUEST,
					message: "Invalid credentials, a password is required!",
				});
			});
		});
	});
});
