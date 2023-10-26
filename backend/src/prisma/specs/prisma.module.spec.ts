import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { PrismaModule } from "../prisma.module";
import { PrismaService } from "../prisma.service";

describe("PrismaModule", () => {
	let module: TestingModule;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			imports: [PrismaModule],
		})
			.useMocker(createMock)
			.compile();
	});

	it("should be defined", async () => {
		expect(module).toBeDefined();
	});

	it("should have (PrismaService)", async () => {
		expect(module.get(PrismaService)).toBeInstanceOf(PrismaService);
	});
});
