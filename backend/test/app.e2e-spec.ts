import { createMock } from "@golevelup/ts-jest";
import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { RedisClient } from "src/redis/redis.provider";

describe("UserController (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		})
			.overrideProvider("REDIS_CLIENT")
			.useValue(createMock<RedisClient>())
			.useMocker(createMock)
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	test.todo("Think well about these tests");
});
