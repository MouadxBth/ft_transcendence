import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { AppModule } from "src/app.module";

describe("AppModule", () => {
	let module: TestingModule;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			imports: [AppModule],
		})
			.useMocker(createMock)
			.compile();
	});

	it("should be defined", async () => {
		expect(module).toBeDefined();
	});
});
