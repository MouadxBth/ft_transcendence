import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UpdateUserDto } from "../dto/update-user.dto";

describe("UserService", () => {
	let service: UserService;
	let prisma: DeepMocked<PrismaService>;

	const user = {
		username: "mbouthai",
		password: "mbouthai",
		firstName: "Mouad",
		lastName: "Bouthaich",
		avatar: "https://images/aatrox.jpeg",
		twoFactorAuthenticationEnabled: false,
	} as User;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService],
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
	});

	describe("create", () => {
		it("should create a new user given all its data and return its data", async () => {
			// arrange
			const createUserDto = {
				username: "mbouthai",
				password: "mbouthai",
				firstName: "Mouad",
				lastName: "Bouthaich",
				avatar: "https://images/aatrox.jpeg",
			} as CreateUserDto;

			const findQuery = {
				where: { username: createUserDto.username },
			};

			const createQuery = {
				data: createUserDto,
			};

			prisma.user.findUnique = jest.fn().mockResolvedValue(null);
			prisma.user.create = jest.fn().mockResolvedValue(user);

			// act
			const result = await service.create(createUserDto);

			// assert

			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(findQuery);
			expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, findQuery);

			expect(prisma.user.create).toHaveBeenCalledTimes(1);
			expect(prisma.user.create).toHaveBeenCalledWith(createQuery);
			expect(prisma.user.create).toHaveBeenNthCalledWith(1, createQuery);

			expect(result).toEqual(user);
		});

		it("should create a new user given partial data and return its data", async () => {
			// arrange
			const expectedUser = {
				username: "mbouthai",
				password: null,
				firstName: null,
				lastName: null,
				avatar: null,
				twoFactorAuthenticationEnabled: false,
			} as User;

			const partialUserInfo = {
				username: "mbouthai",
			} as CreateUserDto;

			const findQuery = {
				where: { username: partialUserInfo.username },
			};

			const createQuery = {
				data: partialUserInfo,
			};

			prisma.user.findUnique = jest.fn().mockResolvedValue(null);
			prisma.user.create = jest.fn().mockResolvedValue(expectedUser);

			// act
			const result = await service.create(partialUserInfo);

			// assert

			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(findQuery);
			expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, findQuery);

			expect(prisma.user.create).toHaveBeenCalledTimes(1);
			expect(prisma.user.create).toHaveBeenCalledWith(createQuery);
			expect(prisma.user.create).toHaveBeenNthCalledWith(1, createQuery);

			expect(result).toEqual(expectedUser);
		});

		it("should throw an exception saying the username exists", async () => {
			// arrange
			const partialUserInfo = {
				username: "mbouthai",
			} as CreateUserDto;

			const findQuery = {
				where: { username: partialUserInfo.username },
			};

			prisma.user.findUnique = jest.fn().mockImplementation(async (value) => value);

			// act
			try {
				await service.create(partialUserInfo);
				fail("Expecting an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe("Username already taken!");
			}

			// assert
			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(findQuery);
			expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, findQuery);
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
			expect(prisma.user.findMany).toHaveBeenCalled();
			expect(prisma.user.findMany).toHaveBeenCalledTimes(1);

			expect(result.length).toBe(1);
			expect(result).toContainEqual(user);
			expect(result).toStrictEqual(users);
		});
	});

	describe("findOne", () => {
		it("should find a user by a given username and return its data", async () => {
			//arrange
			const username = "mbouthai";

			const findQuery = {
				where: { username: username },
			};

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);

			//act
			const result = await service.findOne(username);

			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(findQuery);
			expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, findQuery);

			expect(result).toEqual(user);
		});

		it("should throw a not found exception", async () => {
			//arrange
			const username = "unknown";

			const findQuery = {
				where: { username: username },
			};

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

			//act
			try {
				await service.findOne(username);
				fail("Expecting a not found exception");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
				expect((exception as HttpException).message).toBe("User with that username doesnt exist!");
			}

			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(findQuery);
			expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, findQuery);
		});
	});

	describe("update", () => {
		const username = "mbouthai";

		const updateUserDto = {
			firstName: "tester",
			lastName: "tester",
		} as UpdateUserDto;

		it("should find a user by a given username and update its data", async () => {
			//arrange
			const expectedUser = {
				...user,
				...updateUserDto,
			};

			const findQuery = {
				where: { username: username },
			};

			const updateQuery = {
				data: updateUserDto,
				where: { username: username },
			};

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);
			prisma.user.update = jest.fn().mockImplementationOnce(async (query) => {
				return {
					...user,
					...query.data,
				};
			});

			//act
			const result = await service.update(username, updateUserDto);

			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(findQuery);
			expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, findQuery);

			expect(prisma.user.update).toHaveBeenCalledTimes(1);
			expect(prisma.user.update).toHaveBeenCalledWith(updateQuery);
			expect(prisma.user.update).toHaveBeenNthCalledWith(1, updateQuery);

			expect(result).toEqual(expectedUser);
		});

		it("should throw a not found exception", async () => {
			//arrange
			const findQuery = {
				where: { username: username },
			};

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

			//act
			try {
				await service.update(username, updateUserDto);
				fail("Expecting a not found exception");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
				expect((exception as HttpException).message).toBe("User with that username doesnt exist!");
			}

			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(findQuery);
			expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, findQuery);
		});

		it("should throw a username already exists exception", async () => {
			//arrange
			const updateUserDtoWithUserName = {
				...updateUserDto,
				username: "tester",
			};

			const findQuery = {
				where: { username: username },
			};

			const updateUsernameFindQuery = {
				where: { username: updateUserDtoWithUserName.username },
			};

			prisma.user.findUnique = jest.fn().mockResolvedValue(user);

			//act
			try {
				await service.update(username, updateUserDtoWithUserName);
				fail("Expecting a username already exists exception");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).message).toBe(
					"User with that username already exists!"
				);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.BAD_REQUEST);
			}

			expect(prisma.user.findUnique).toHaveBeenCalledTimes(2);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(findQuery);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(updateUsernameFindQuery);
			expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, findQuery);
			expect(prisma.user.findUnique).toHaveBeenNthCalledWith(2, updateUsernameFindQuery);
		});
	});

	describe("remove", () => {
		it("should find a user by a given username and remove them", async () => {
			// arrange
			const username = "mbouthai";

			const query = {
				where: { username: username },
			};

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);
			prisma.user.delete = jest.fn().mockResolvedValueOnce(user);

			//act
			const result = await service.remove(username);

			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(query);
			expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, query);

			expect(prisma.user.delete).toHaveBeenCalledTimes(1);
			expect(prisma.user.delete).toHaveBeenCalledWith(query);
			expect(prisma.user.delete).toHaveBeenNthCalledWith(1, query);

			expect(result).toEqual(user);
		});

		it("should throw a not found exception", async () => {
			//arrange
			const username = "mbouthai";

			const findQuery = {
				where: { username: username },
			};

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

			//act
			try {
				await service.remove(username);
				fail("Expecting a not found exception");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).message).toBe("User with that username doesnt exist!");
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
			}

			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(findQuery);
			expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, findQuery);
		});
	});
});
