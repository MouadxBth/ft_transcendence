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
		firstName: "Mouad",
		lastName: "Bouthaich",
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
			firstName: "Mouad",
			lastName: "Bouthaich",
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
				avatar: "aatrox.jpeg",
			} as User;

			prisma.user.findUnique = jest.fn().mockImplementation(async (_) => null);
			prisma.user.create = jest.fn().mockResolvedValue(user);

			// act
			const result = await service.create(createUserDto);

			// assert

			expect(prisma.user.findUnique).toHaveBeenCalled();

			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { username: createUserDto.username },
			});

			expect(prisma.user.create).toHaveBeenCalled();
			expectObjectContainingMost(partialUserInfo, result);

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

			expect(prisma.user.findUnique).toHaveBeenCalled();
			expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username } });
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

			expect(prisma.user.findUnique).toHaveBeenCalled();
			expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username } });
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

			expect(prisma.user.findUnique).toHaveBeenCalled();
			expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username: username } });

			expect(prisma.user.update).toHaveBeenCalled();
			expect(prisma.user.update).toHaveBeenCalledWith({
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

			expect(prisma.user.findUnique).toHaveBeenCalled();
			expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username: username } });
		});

		it("should throw a username already exists exception", async () => {
			//arrange

			const dto = {
				username: "tester",
				firstName: "tester",
				lastName: "tester",
				email: "tester@gmail.com",
			} as UpdateUserDto;

			const partialUserInfo = {
				username: "mbouthai",
				firstName: "Mouad",
				lastName: "Bouthaich",
				avatar: "aatrox.jpeg",
			} as User;

			prisma.user.findUnique = jest.fn().mockResolvedValue(partialUserInfo);

			//act
			try {
				await service.update(username, dto);
				fail("Expecting a username already exists exception");
			} catch (exception: any) {
				expect(exception).toBeInstanceOf(HttpException);
				expect(exception.response).toBe("User with that username already exists!");
				expect(exception.status).toBe(HttpStatus.BAD_REQUEST);
			}

			expect(prisma.user.findUnique).toHaveBeenCalledTimes(2);
			expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username: username } });
			expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username: dto.username } });
		});
	});

	describe("remove", () => {
		it("should find a user by a given username and remove them", async () => {
			const username = "mbouthai";

			prisma.user.findUnique = jest.fn().mockResolvedValueOnce(user);
			prisma.user.delete = jest.fn().mockImplementationOnce(async (_) => user);

			//act
			const result = await service.remove(username);

			expect(prisma.user.findUnique).toHaveBeenCalled();
			expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username: username } });

			expect(prisma.user.delete).toHaveBeenCalled();
			expect(prisma.user.delete).toHaveBeenCalledWith({ where: { username: username } });
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

			expect(prisma.user.findUnique).toHaveBeenCalled();
			expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username: username } });
		});
	});
});
