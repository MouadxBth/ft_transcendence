import { createMock } from "@golevelup/ts-jest";
import { TestingModule, Test } from "@nestjs/testing";
import { AuthModule } from "../auth.module";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { SessionSerializer } from "../utilities/session.serializer";
import { AuthenticatedGuard } from "../guards/authenticated.guard";
import { LocalController } from "../local/local.controller";
import { LocalService } from "../local/local.service";
import { LocalGuard } from "../local/guards/local.guard";
import { LocalStrategy } from "../local/strategies/local.strategy";

describe("AuthModule", () => {
	let module: TestingModule;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			imports: [AuthModule],
		})
			.useMocker(createMock)
			.compile();
	});

	it("should be defined", async () => {
		expect(module).toBeDefined();
	});

	it("should have (AuthController)", async () => {
		expect(module.get(AuthController)).toBeInstanceOf(AuthController);
	});
	it("should have (AuthService)", async () => {
		expect(module.get(AuthService)).toBeInstanceOf(AuthService);
	});

	it("should have (SessionSerializer)", async () => {
		expect(module.get(SessionSerializer)).toBeInstanceOf(SessionSerializer);
	});

	it("should have (AuthenticatedGuard)", async () => {
		expect(module.get(AuthenticatedGuard)).toBeInstanceOf(AuthenticatedGuard);
	});

	describe("Local", () => {
		it("should have (LocalController)", () => {
			expect(module.get(LocalController)).toBeInstanceOf(LocalController);
		});
		it("should have (LocalService)", () => {
			expect(module.get(LocalService)).toBeInstanceOf(LocalService);
		});

		it("should have (LocalGuard)", () => {
			expect(module.get(LocalGuard)).toBeInstanceOf(LocalGuard);
		});

		it("should have (LocalStrategy)", () => {
			expect(module.get(LocalStrategy)).toBeInstanceOf(LocalStrategy);
		});
	});
});
