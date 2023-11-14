import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { UserModule } from "src/user/user.module";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { UpdateUserDto } from "src/user/dto/update-user.dto";

describe("UserController (e2e)", () => {
	let app: INestApplication;
	let prisma: DeepMocked<PrismaService>;

	const user = {
		username: "mbouthai",
		firstName: "Mouad",
		lastName: "Bouthaich",
		avatar: "https://images.com/aatrox.jpeg",
	} as User;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UserModule],
		})
			.useMocker(createMock)
			.compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
		prisma = app.get(PrismaService);
		await app.init();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("(INestApplication) should be defined", () => {
		expect(app).toBeDefined();
	});

	describe("/user (POST)", () => {
		it("should create a new user", () => {
			const payload = {
				username: "mbouthai",
				password: "mbouthai",
				firstName: "Mouad",
				lastName: "Bouthaich",
				avatar: "https://images.com/aatrox.jpeg",
			};

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);
			prisma.user.create = jest.fn().mockResolvedValueOnce(user);

			return request(app.getHttpServer())
				.post("/user")
				.send(payload)
				.expect(HttpStatus.CREATED)
				.expect(user);
		});

		it("should throw an exception saying the username is taken", () => {
			const payload = {
				username: "mbouthai",
				password: "mbouthai",
				firstName: "Mouad",
				lastName: "Bouthaich",
				avatar: "https://images.com/aatrox.jpeg",
			};

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);

			return request(app.getHttpServer())
				.post("/user")
				.send(payload)
				.expect({ statusCode: HttpStatus.BAD_REQUEST, message: "Username already taken!" });
		});

		it("should throw an exception saying bad request because of the username", () => {
			// Arrange
			const payload = {};

			// act, assert
			return request(app.getHttpServer())
				.post("/user")
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
	});

	describe("/user (GET)", () => {
		it("should return an array of user", async () => {
			// arrange
			const users = [user];
			prisma.user.findMany = jest.fn().mockResolvedValueOnce(users);

			// act, assert
			return request(app.getHttpServer()).get("/user").expect(HttpStatus.OK).expect(users);
		});
	});

	describe("/user/:id (GET)", () => {
		it("should find a user by a given username and return its data", async () => {
			//arrange
			const username = "mbouthai";
			prisma.user.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data.where.username === username) return user;
				return null;
			});

			// act, assert
			return request(app.getHttpServer())
				.get(`/user/${username}`)
				.expect(HttpStatus.OK)
				.expect(user);
		});

		it("should throw a not found exception", async () => {
			//arrange
			const username = "mbouthai";
			prisma.user.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data.where.username === username) return null;
				return user;
			});

			// act, assert
			return request(app.getHttpServer())
				.get(`/user/${username}`)
				.expect(HttpStatus.NOT_FOUND)
				.expect({
					statusCode: HttpStatus.NOT_FOUND,
					message: "User with that username doesnt exist!",
				});
		});
	});

	describe("/user/:id (PATCH)", () => {
		const username = "mbouthai";

		const payload = {
			firstName: "tester",
			lastName: "tester",
		};

		it("should find a user by a given username and update its data", async () => {
			//arrange

			prisma.user.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data.where.username === username) return user;
				return null;
			});

			prisma.user.update = jest.fn().mockImplementationOnce(async (query) => {
				return {
					...user,
					...query.data,
				};
			});

			return request(app.getHttpServer())
				.patch(`/user/${username}`)
				.send(payload)
				.expect(HttpStatus.OK)
				.expect({
					...user,
					...payload,
				});
		});

		it("should throw a not found exception", async () => {
			//arrange

			prisma.user.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data.where.username === username) return null;
				return user;
			});

			//act
			return request(app.getHttpServer()).patch(`/user/${username}`).send(payload).expect({
				statusCode: HttpStatus.NOT_FOUND,
				message: "User with that username doesnt exist!",
			});
		});

		it("should not modify the user", async () => {
			//arrange

			prisma.user.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data.where.username === username) return user;
				return null;
			});
			prisma.user.update = jest.fn().mockImplementationOnce(async (query) => {
				return {
					...user,
					...query.data,
				};
			});

			return request(app.getHttpServer())
				.patch(`/user/${username}`)
				.send({})
				.expect(HttpStatus.OK)
				.expect(user);
		});

		it("should throw a username already exists exception", async () => {
			//arrange

			const usernameUpdate = {
				username: "tester",
				firstName: "tester",
				lastName: "tester",
			};

			prisma.user.findUnique = jest.fn().mockResolvedValue(user);

			//act
			return request(app.getHttpServer()).patch(`/user/${username}`).send(usernameUpdate).expect({
				statusCode: HttpStatus.BAD_REQUEST,
				message: "User with that username already exists!",
			});
		});

		it("should throw an exception saying bad request because of the password", () => {
			// Arrange
			const payload = {
				password: "",
			} as UpdateUserDto;

			// act, assert
			return request(app.getHttpServer())
				.patch(`/user/${username}`)
				.send(payload)
				.expect({
					message: [
						"Password cannot contain whitespaces",
						"Password must be between 8 and 30 characters",
					],
					error: "Bad Request",
					statusCode: HttpStatus.BAD_REQUEST,
				});
		});

		it("should throw an exception saying bad request because of the first name", () => {
			// Arrange
			const payload = {
				firstName: "",
			} as UpdateUserDto;

			// act, assert
			return request(app.getHttpServer())
				.patch(`/user/${username}`)
				.send(payload)
				.expect({
					message: [
						"First name cannot contain whitespaces",
						"First name must be between 3 and 30 characters",
					],
					error: "Bad Request",
					statusCode: HttpStatus.BAD_REQUEST,
				});
		});

		it("should throw an exception saying bad request because of the last name", () => {
			// Arrange
			const payload = {
				lastName: "",
			} as UpdateUserDto;

			// act, assert
			return request(app.getHttpServer())
				.patch(`/user/${username}`)
				.send(payload)
				.expect({
					message: [
						"Last name cannot contain whitespaces",
						"Last name must be between 3 and 30 characters",
					],
					error: "Bad Request",
					statusCode: HttpStatus.BAD_REQUEST,
				});
		});

		it("should throw an exception saying bad request because of the avatar", () => {
			// Arrange
			const payload = {
				avatar: "",
			} as UpdateUserDto;

			// act, assert
			return request(app.getHttpServer())
				.patch(`/user/${username}`)
				.send(payload)
				.expect({
					message: ["Invalid avatar URL format"],
					error: "Bad Request",
					statusCode: HttpStatus.BAD_REQUEST,
				});
		});
	});

	describe("/user/:id (DELETE)", () => {
		const username = "mbouthai";

		it("should find a user by a given username and remove them", async () => {
			// arrange
			prisma.user.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data.where.username === username) return user;
				return null;
			});
			prisma.user.delete = jest.fn().mockImplementationOnce(async (_) => user);

			//act
			return request(app.getHttpServer())
				.delete(`/user/${username}`)
				.expect(HttpStatus.OK)
				.expect(user);
		});

		it("should throw a not found exception", async () => {
			// arrange
			prisma.user.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data.where.username === username) return null;
				return user;
			});
			prisma.user.delete = jest.fn().mockImplementationOnce(async (_) => user);

			//act
			return request(app.getHttpServer())
				.delete(`/user/${username}`)
				.expect(HttpStatus.NOT_FOUND)
				.expect({
					statusCode: HttpStatus.NOT_FOUND,
					message: "User with that username doesnt exist!",
				});
		});
	});
});
