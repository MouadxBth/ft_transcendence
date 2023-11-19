import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { User } from "@prisma/client";
import passport from "passport";
import { AuthModule } from "src/auth/auth.module";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { PrismaService } from "src/prisma/prisma.service";
import request from "supertest";
import session from "express-session";
import { AuthService } from "src/auth/auth.service";

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

		it("should throw an exception saying user not logged in", () => {
			jest.spyOn(guard, "canActivate").mockResolvedValueOnce(false);

			return request(app.getHttpServer())
				.post("/auth/logout")
				.send()
				.expect({ statusCode: HttpStatus.BAD_REQUEST, message: "You are not logged in!" });
		});
	});

	describe("logout", () => {
		it("should logout successfully", async () => {
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
			jest.spyOn(guard, "canActivate").mockResolvedValueOnce(false);

			return request(app.getHttpServer())
				.post("/auth/logout")
				.send()
				.expect({ statusCode: HttpStatus.BAD_REQUEST, message: "You are not logged in!" });
		});
	});

	describe("Local", () => {
		const user = {
			username: "mbouthai",
			password: "$2a$10$PCSlWmzYc.jrD5.lgTJwbO9mm4diMkgz8gT3E4dpXFN7pNHhnk2hy",
		} as User;

		describe("Login (/auth/local/login)", () => {
			it("should login successfully", () => {
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
			it("should register a new user successfully", () => {
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

			it("should throw an exception due to invalid username", () => {
				const payload = {};

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
