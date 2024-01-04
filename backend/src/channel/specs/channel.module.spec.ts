import { Test, TestingModule } from "@nestjs/testing";
import { ChannelModule } from "../channel.module";
import { createMock } from "@golevelup/ts-jest";
import { ChannelController } from "../channel.controller";
import { ChannelService } from "../channel.service";

describe("ChannelModule", () => {
	let module: TestingModule;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			imports: [ChannelModule],
		})
			.useMocker(createMock)
			.compile();
	});

	it("should be defined", async () => {
		expect(module).toBeDefined();
	});

	it("should have (ChannelController)", async () => {
		expect(module.get(ChannelController)).toBeInstanceOf(ChannelController);
	});

	it("should have (ChannelService)", async () => {
		expect(module.get(ChannelService)).toBeInstanceOf(ChannelService);
	});
});
