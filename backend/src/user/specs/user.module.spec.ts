import { Test, TestingModule } from "@nestjs/testing";
import { UserModule } from "../user.module";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";
import { createMock } from "@golevelup/ts-jest";

describe("UserModule", () => {
	let module: TestingModule;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			imports: [UserModule],
		})
			.useMocker(createMock)
			.compile();
	});

	it("should be defined", async () => {
		expect(module).toBeDefined();
	});

	it("should have (UserController)", async () => {
		expect(module.get(UserController)).toBeInstanceOf(UserController);
	});
	it("should have (UserService)", async () => {
		expect(module.get(UserService)).toBeInstanceOf(UserService);
	});
});
