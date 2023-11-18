import { Test, TestingModule } from "@nestjs/testing";
import { LocalService } from "../local.service";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { UserService } from "src/user/user.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { HttpException, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";

describe("LocalService", () => {
	let localService: LocalService;
	let userService: DeepMocked<UserService>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [LocalService],
		})
			.useMocker(createMock)
			.compile();

		localService = module.get<LocalService>(LocalService);
		userService = module.get(UserService);
	});

	it("(LocalService) should be defined", () => {
		expect(localService).toBeDefined();
	});

	it("(UserService) should be defined", () => {
		expect(userService).toBeDefined();
	});

	describe("validate", () => {
		const user = {
			username: "mbouthai",
			password: "$2a$10$x7ohmO2FR8kgYihCuPq4ouO7Sd9i2NbYtBa6O9CW4R04L2eyxpaNm",
			firstName: "Mouad",
			lastName: "Bouthaich",
			avatar: "https://images/aatrox.jpeg",
			twoFactorAuthenticationEnabled: false,
		} as User;

		it("should validate the given username and password", async () => {
			const userServiceFindOneSpy = jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);
			const username = "mbouthai";
			const password = "mbouthai";

			const result = await localService.validate(username, password);

			expect(userServiceFindOneSpy).toHaveBeenCalledTimes(1);
			expect(userServiceFindOneSpy).toHaveBeenCalledWith(username);
			expect(userServiceFindOneSpy).toHaveBeenNthCalledWith(1, username);

			expect(result).toEqual({ ...user, password: undefined });
		});
		it("should throw an exception if the given user doesn't use a password", async () => {
			const userWithoutPassword = { ...user, password: null };
			const userServiceFindOneSpy = jest
				.spyOn(userService, "findOne")
				.mockResolvedValueOnce(userWithoutPassword);
			const username = "mbouthai";
			const password = "mbouthai";

			try {
				await localService.validate(username, password);
				fail("Expecting an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.UNAUTHORIZED);
				expect((exception as HttpException).message).toBe("Invalid credentials!");
			}

			expect(userServiceFindOneSpy).toHaveBeenCalledTimes(1);
			expect(userServiceFindOneSpy).toHaveBeenCalledWith(username);
			expect(userServiceFindOneSpy).toHaveBeenNthCalledWith(1, username);
		});
		it("should throw an exception if the given credentials are incorrect", async () => {
			const userServiceFindOneSpy = jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);
			const username = "mbouthai";
			const password = "incorrect";

			try {
				await localService.validate(username, password);
				fail("Expecting an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.UNAUTHORIZED);
				expect((exception as HttpException).message).toBe("Invalid credentials!");
			}

			expect(userServiceFindOneSpy).toHaveBeenCalledTimes(1);
			expect(userServiceFindOneSpy).toHaveBeenCalledWith(username);
			expect(userServiceFindOneSpy).toHaveBeenNthCalledWith(1, username);
		});
	});

	describe("register", () => {
		const createUserDto = {
			username: "mbouthai",
			password: "mbouthai",
			firstName: "Mouad",
			lastName: "Bouthaich",
			avatar: "https://images/aatrox.jpeg",
		} as CreateUserDto;

		it("should register a new user with the given username and password", async () => {
			const user = {
				username: "mbouthai",
				password: "$2a$10$x7ohmO2FR8kgYihCuPq4ouO7Sd9i2NbYtBa6O9CW4R04L2eyxpaNm",
				firstName: "Mouad",
				lastName: "Bouthaich",
				avatar: "https://images/aatrox.jpeg",
				twoFactorAuthenticationEnabled: false,
			} as User;

			const spy = jest.spyOn(userService, "create").mockResolvedValueOnce(user);

			const result = await localService.register(createUserDto);

			expect(spy).toHaveBeenCalledTimes(1);

			expect(await bcrypt.compare(createUserDto.password!, result.password!)).toBeTruthy();
			expect(result).toEqual(user);
		});
		it("should throw an exception if the given user hasn't provided a password", async () => {
			const dtoWithoutPassword = { ...createUserDto, password: undefined } as CreateUserDto;
			try {
				await localService.register(dtoWithoutPassword);
				fail("Expecting an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe(
					"Invalid credentials, a password is required!"
				);
			}
		});
	});
});
