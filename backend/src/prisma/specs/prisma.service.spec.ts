import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma.service";

describe("PrismaService", () => {
	let service: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PrismaService],
		}).compile();

		service = module.get<PrismaService>(PrismaService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should call $connect on initialization", async () => {
		service.$connect = jest.fn();
		const connectSpy = jest.spyOn(service, "$connect");

		await service.onModuleInit();

		expect(connectSpy).toHaveBeenCalled();

		connectSpy.mockRestore();
	});
});
