import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UpdateUserDto } from "../dto/update-user.dto";

describe("UserService", () => {
	let service: UserService;
	let prisma: DeepMocked<PrismaService>;

	const user = {
		username: "mbouthai",
		password: "123456",
		firstName: "Mouad",
		lastName: "Bouthaich",
		email: "mouad.bouthaich@outlook.com",
		avatar: "aatrox.jpeg",
	} as User;

	beforeEach(async () => {
		const sht = {
			provide: "MOUAD",
			useFactory: async (_dto?: CreateUserDto) => {
				if (!_dto) return null;
				_dto;
				return user;
			},
			inject: [{ token: CreateUserDto, optional: true }],
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, sht],
		})
			.useMocker(createMock)
			.compile();

		service = module.get<UserService>(UserService);
		prisma = module.get(PrismaService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("(UserService) should be defined", () => {
		expect(service).toBeDefined();
	});

	it("(PrismaService) should be defined", () => {
		expect(prisma).toBeDefined();
		expect(prisma.user).toBeDefined();
	});

	describe("create", () => {
		const createUserDto = {
			username: "mbouthai",
			password: "123456",
			firstName: "Mouad",
			lastName: "Bouthaich",
			email: "mouad.bouthaich@outlook.com",
			avatar: "avatar",
		} as CreateUserDto;

		const expectObjectContainingMost = (expected: any, received: any) => {
			for (const key in expected) {
				if (expected.hasOwnProperty(key)) {
					expect(received).toHaveProperty(key, expected[key]);
				}
			}
		};

		it("should create a new user and return its data", async () => {
			// arrange
			const partialUserInfo = {
				username: "mbouthai",
				firstName: "Mouad",
				lastName: "Bouthaich",
				email: "mouad.bouthaich@outlook.com",
				avatar: "aatrox.jpeg",
			} as User;
			const passwordHash = await bcrypt.hash(createUserDto.password, 10);

			prisma.user.findUnique = jest.fn().mockImplementation(async (_) => null);
			prisma.user.create = jest.fn().mockResolvedValue(user);

			// act
			const result = await service.create(createUserDto);

			// assert

			expect(prisma.user.findUnique).toHaveBeenCalledTimes(2);

			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { username: createUserDto.username },
			});

			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { email: createUserDto.email },
			});

			expect(prisma.user.create).toBeCalled();
			expectObjectContainingMost(partialUserInfo, result);
			expect(await bcrypt.compare(result.password, passwordHash)).toBeTruthy();

			expect(result).toEqual(user);
		});

		it("should throw an exception saying the username exists", async () => {
			// arrange
			prisma.user.findUnique = jest.fn().mockImplementation(async (value) => value);

			// act
			try {
				await service.create(createUserDto);
				fail("Expecting an exception to be thrown!");
			} catch (exception: any) {
				expect(exception).toBeInstanceOf(HttpException);
				expect(exception.response).toBe("Username already taken!");
				expect(exception.status).toBe(HttpStatus.BAD_REQUEST);
			}

			// assert
			expect(prisma.user.findUnique).toHaveBeenCalled();
			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { username: createUserDto.username },
			});
		});

		it("should throw an exception saying the email exists", async () => {
			// arrange
			prisma.user.findUnique = jest.fn().mockImplementation(async (value) => {
				if (value.where.email === createUserDto.email) return value;
				return null;
			});

			// act
			try {
				await service.create(createUserDto);
				fail("Expecting an exception to be thrown!");
			} catch (exception: any) {
				expect(exception).toBeInstanceOf(HttpException);
				expect(exception.response).toBe("Email is already in use!");
				expect(exception.status).toBe(HttpStatus.BAD_REQUEST);
			}

			// assert
			expect(prisma.user.findUnique).toHaveBeenCalled();
			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { username: createUserDto.username },
			});
		});
	});

	describe("findAll", () => {
		it("should return an array of user", async () => {
			//arrange
			const users = [user];
			prisma.user.findMany = jest.fn().mockResolvedValueOnce(users);

			//act
			const result = await service.findAll();

			// assert
			expect(prisma.user.findMany).toBeCalled();
			expect(result).toEqual(users);
		});
	});

	describe("findOne", () => {
		it("should find a user by a given username and return its data", async () => {
			//arrange
			const username = "mbouthai";
			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);

			//act
			const result = await service.findOne(username);

			expect(prisma.user.findUnique).toBeCalled();
			expect(prisma.user.findUnique).toBeCalledWith({ where: { username } });
			expect(result).toEqual(user);
		});

		it("should throw a not found exception", async () => {
			//arrange
			const username = "unknown";
			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

			//act
			try {
				await service.findOne(username);
				fail("Expecting a not found exception");
			} catch (exception: any) {
				expect(exception).toBeInstanceOf(HttpException);
				expect(exception.response).toBe("User with that username doesnt exist!");
				expect(exception.status).toBe(HttpStatus.NOT_FOUND);
			}

			expect(prisma.user.findUnique).toBeCalled();
			expect(prisma.user.findUnique).toBeCalledWith({ where: { username } });
		});
	});

	describe("findOneByEmail", () => {
		it("should find a user by a given email and return its data", async () => {
			//arrange
			const email = "mouad.bouthaich@outlook.com";
			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);

			//act
			const result = await service.findOneByEmail(email);

			expect(prisma.user.findUnique).toBeCalled();
			expect(prisma.user.findUnique).toBeCalledWith({ where: { email } });
			expect(result).toEqual(user);
		});

		it("should throw a not found exception", async () => {
			//arrange
			const email = "unknown@gmail.com";
			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

			//act
			try {
				await service.findOneByEmail(email);
				fail("Expecting a not found exception");
			} catch (exception: any) {
				expect(exception).toBeInstanceOf(HttpException);
				expect(exception.response).toBe("User with that email doesnt exist!");
				expect(exception.status).toBe(HttpStatus.NOT_FOUND);
			}

			expect(prisma.user.findUnique).toBeCalled();
			expect(prisma.user.findUnique).toBeCalledWith({ where: { email } });
		});
	});

	describe("update", () => {
		const username = "mbouthai";

		const updateUserDto = {
			firstName: "tester",
			lastName: "tester",
			email: "tester@gmail.com",
		} as UpdateUserDto;

		it("should find a user by a given username and update its data", async () => {
			//arrange

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);
			prisma.user.update = jest.fn().mockImplementationOnce(async (query) => {
				return {
					...user,
					...query.data,
				};
			});

			//act
			const result = await service.update(username, updateUserDto);

			expect(prisma.user.findUnique).toBeCalled();
			expect(prisma.user.findUnique).toBeCalledWith({ where: { username: username } });

			expect(prisma.user.update).toBeCalled();
			expect(prisma.user.update).toBeCalledWith({
				data: updateUserDto,
				where: { username: username },
			});
			expect(result).toEqual({ ...user, ...updateUserDto });
		});

		it("should throw a not found exception", async () => {
			//arrange

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

			//act
			try {
				await service.update(username, updateUserDto);
				fail("Expecting a not found exception");
			} catch (exception: any) {
				expect(exception).toBeInstanceOf(HttpException);
				expect(exception.response).toBe("User with that username doesnt exist!");
				expect(exception.status).toBe(HttpStatus.NOT_FOUND);
			}

			expect(prisma.user.findUnique).toBeCalled();
			expect(prisma.user.findUnique).toBeCalledWith({ where: { username: username } });
		});
	});

	describe("remove", () => {
		it("should find a user by a given username and remove them", async () => {
			const username = "mbouthai";

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);
			prisma.user.delete = jest.fn().mockImplementationOnce(async (_) => user);

			//act
			const result = await service.remove(username);

			expect(prisma.user.findUnique).toBeCalled();
			expect(prisma.user.findUnique).toBeCalledWith({ where: { username: username } });

			expect(prisma.user.delete).toBeCalled();
			expect(prisma.user.delete).toBeCalledWith({ where: { username: username } });
			expect(result).toEqual(user);
		});

		it("should throw a not found exception", async () => {
			//arrange
			const username = "mbouthai";

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

			//act
			try {
				await service.remove(username);
				fail("Expecting a not found exception");
			} catch (exception: any) {
				expect(exception).toBeInstanceOf(HttpException);
				expect(exception.response).toBe("User with that username doesnt exist!");
				expect(exception.status).toBe(HttpStatus.NOT_FOUND);
			}

			expect(prisma.user.findUnique).toBeCalled();
			expect(prisma.user.findUnique).toBeCalledWith({ where: { username: username } });
		});
	});
});
