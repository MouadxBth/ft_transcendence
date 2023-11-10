import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { AppModule } from "src/app.module";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Cache } from "joi";
import { PrismaModule } from "src/prisma/prisma.module";
import { RedisModule } from "src/redis/redis.module";
import { UserModule } from "src/user/user.module";
import { RedisClient } from "src/redis/redis.provider";

describe("AppModule", () => {
	let app: TestingModule;
	let config: ConfigService;

	beforeAll(async () => {
		app = await Test.createTestingModule({
			imports: [AppModule],
		})
			.overrideProvider("REDIS_CLIENT")
			.useValue(createMock<RedisClient>())
			.compile();

		config = app.get<ConfigService>(ConfigService);
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

	it("should have a ConfigModule", () => {
		const configModule = app.get(ConfigModule);
		expect(configModule).toBeDefined();
		expect(config.get<string>("DATABASE_URL")).toBeDefined();
	});

	it("should have a CacheModule", () => {
		const cacheModule = app.get<Cache>(CACHE_MANAGER);
		expect(cacheModule).toBeDefined();
	});
});
