import { createMock } from "@golevelup/ts-jest";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { INestApplication } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TestingModule, Test } from "@nestjs/testing";
import { Cache } from "joi";
import { AppModule } from "src/app.module";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisModule } from "src/redis/redis.module";
import { RedisClient } from "src/redis/redis.provider";
import { UserModule } from "src/user/user.module";

describe("AppModule (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		})
			.overrideProvider("REDIS_CLIENT")
			.useValue(createMock<RedisClient>())
			.overrideProvider(PrismaService)
			.useValue(createMock<PrismaService>())
			.useMocker(createMock)
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it("should be defined", () => {
		const module = app.get<AppModule>(AppModule);
		expect(module).toBeDefined();
	});

	it("should have a PrismaModule", () => {
		const prismaModule = app.get(PrismaModule);
		expect(prismaModule).toBeDefined();
	});

	it("should have a RedisModule", () => {
		const redisModule = app.get(RedisModule);
		expect(redisModule).toBeDefined();
	});

	it("should have a UserModule", () => {
		const userModule = app.get(UserModule);
		expect(userModule).toBeDefined();
	});

	it("should have a CacheModule", () => {
		const cacheModule = app.get<Cache>(CACHE_MANAGER);
		expect(cacheModule).toBeDefined();
	});

	it("should have an AuthModule", () => {
		const authModule = app.get(AuthModule);
		expect(authModule).toBeDefined();
	});

	describe("ConfigModule", () => {
		it("should be defined", () => {
			const configModule = app.get(ConfigModule);
			expect(configModule).toBeDefined();
		});

		it("should have a ConfigService", () => {
			const configService = app.get(ConfigService);
			expect(configService).toBeDefined();
		});

		it("should be able to load a value from the config", () => {
			const configService = app.get(ConfigService);

			const value = configService.get<string>("DATABASE_URL");

			expect(value).toBeDefined();
			expect(value?.length).toBeGreaterThan(0);
		});
	});
});
