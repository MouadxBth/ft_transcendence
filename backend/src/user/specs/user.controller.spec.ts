import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "../user.controller";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserService } from "../user.service";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { User } from "@prisma/client";

describe("UserController", () => {
	let controller: UserController;
	let service: DeepMocked<UserService>;

	const user = {
		username: "mbouthai",
		firstName: "Mouad",
		lastName: "Bouthaich",
		avatar: "aatrox.jpeg",
	} as User;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
		})
			.useMocker(createMock)
			.compile();

		controller = module.get<UserController>(UserController);
		service = module.get(UserService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("(UserController) should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("(UserService) should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("create", () => {
		beforeEach(() => {
			jest.spyOn(service, "create");
		});

		it("should be defined", () => {
			expect(service.create).toBeDefined();
		});

		it("should create a new user with the given data", async () => {
			// arrange
			const createUserDto = {
				username: "mbouthai",
				firstName: "Mouad",
				lastName: "Bouthaich",
				avatar: "avatar",
			} as CreateUserDto;

			service.create.mockResolvedValueOnce(user);

			// act
			const result = await controller.create(createUserDto);

			// assert
			expect(service.create).toBeCalled();
			expect(service.create).toBeCalledWith(createUserDto);

			expect(result).toEqual(user);
		});
	});

	describe("findAll", () => {
		beforeEach(() => {
			jest.spyOn(service, "findAll");
		});

		it("should be defined", () => {
			expect(service.findAll).toBeDefined();
		});

		it("should return an array of user", async () => {
			// arrange
			const users = [user];
			service.findAll.mockResolvedValueOnce(users);

			// act
			const result = await controller.findAll();

			// assert
			expect(service.findAll).toBeCalled();
			expect(result).toEqual(users);
		});
	});

	describe("findOne", () => {
		beforeEach(() => {
			jest.spyOn(service, "findOne");
		});

		it("should be defined", () => {
			expect(service.findOne).toBeDefined();
		});

		it("should find a user by a given username and return his data", async () => {
			// arrange
			const username = "mbouthai";
			service.findOne.mockResolvedValueOnce(user);

			// act
			const result = await controller.findOne(username);

			// assert
			expect(service.findOne).toBeCalled();
			expect(service.findOne).toBeCalledWith(username);

			expect(result).toEqual(user);
		});
	});

	describe("update", () => {
		beforeEach(() => {
			jest.spyOn(service, "update");
		});

		it("should be defined", () => {
			expect(service.update).toBeDefined();
		});

		it("should find a user by a given username and update his data", async () => {
			//arrange
			const username = "mbouthai";

			const updateUserDto = {
				firstname: "tester",
				lastname: "tester",
				email: "tester@gmail.com",
			} as UpdateUserDto;

			service.update.mockImplementationOnce(async (_, data: any) => {
				return {
					...user,
					...data,
				};
			});

			//act
			const result = await controller.update(username, updateUserDto);

			expect(service.update).toBeCalled();
			expect(service.update).toBeCalledWith(username, updateUserDto);

			expect(result).toEqual({ ...user, ...updateUserDto });
		});
	});

	describe("remove", () => {
		beforeEach(() => {
			jest.spyOn(service, "remove");
		});

		it("should be defined", () => {
			expect(service.remove).toBeDefined();
		});

		it("should find a user by a given username and remove them", async () => {
			const username = "mbouthai";

			service.remove.mockResolvedValueOnce(user);

			//act
			const result = await controller.remove(username);

			expect(service.remove).toBeCalled();
			expect(service.remove).toBeCalledWith(username);

			expect(result).toEqual(user);
		});
	});
});
