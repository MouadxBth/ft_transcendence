import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { Channel } from "@prisma/client";
import { ChannelModule } from "src/channel/channel.module";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import passport from "passport";
import { MockUserMiddleware } from "src/channel/middlewares/mockUser.middleware";

describe("ChannelController (e2e)", () => {
	let app: INestApplication;
	let prisma: DeepMocked<PrismaService>;
	let gaurd: DeepMocked<AuthenticatedGuard>;

	const channel = {
		name: "channel",
		status: "PUBLIC",
		ownerId: "owner",
	} as Channel;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ChannelModule, PrismaModule],
		})
			.overrideGuard(AuthenticatedGuard)
			.useValue(createMock<AuthenticatedGuard>())
			.overrideProvider(PrismaService)
			.useValue(createMock<PrismaService>())
			.useMocker(createMock)
			.compile();

		app = module.createNestApplication();
		app.use(passport.initialize());
		app.use(new MockUserMiddleware().use);
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

		prisma = app.get(PrismaService);
		gaurd = app.get(AuthenticatedGuard);

		await app.init();
	});

	afterEach(async () => {
		jest.clearAllMocks();
	});

	it("(INestApplication) should be defined", async () => {
		expect(app).toBeDefined();
	});

	it("(PrismaService) should be defined", async () => {
		expect(prisma).toBeDefined();
	});

	describe("POST /channel", () => {
		it("should create a new channel", async () => {
			const payload = {
				name: "channel",
				status: "PUBLIC",
				owner: "owner",
			};

			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.user.findUnique = jest.fn().mockImplementation(async (value) => value);
			prisma.channel.findUnique = jest.fn().mockResolvedValue(null);
			prisma.channel.create = jest.fn().mockResolvedValue(channel);

			return request(app.getHttpServer())
				.post("/channel")
				.send(payload)
				.expect(HttpStatus.CREATED)
				.expect(channel);
		});
		it("should throw an exception saying the user is not authenticated", async () => {
			const payload = {
				name: "channel",
				status: "PUBLIC",
				owner: "owner",
			};

			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(false);

			return request(app.getHttpServer()).post("/channel").send(payload).expect({
				message: "Forbidden resource",
				error: "Forbidden",
				statusCode: HttpStatus.FORBIDDEN,
			});
		});
		it("should throw an exception saying the name is already taken", async () => {
			const payload = {
				name: "channel",
				status: "PUBLIC",
				owner: "owner",
			};

			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementation(async (value) => value);

			return request(app.getHttpServer())
				.post("/channel")
				.send(payload)
				.expect({ statusCode: HttpStatus.BAD_REQUEST, message: "Channel name already taken!" });
		});
		it("should throw an exception when no password is set for protected channels", async () => {
			const payload = {
				name: "channel",
				status: "PROTECTED",
				owner: "owner",
			};

			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.user.findUnique = jest.fn().mockImplementation(async (value) => value);
			prisma.channel.findUnique = jest.fn().mockResolvedValue(null);

			return request(app.getHttpServer()).post("/channel").send(payload).expect({
				statusCode: HttpStatus.BAD_REQUEST,
				message: "Password must be set for protected channels.",
			});
		});
		it("should throw an exception when a password is set for public channels", async () => {
			const payload = {
				name: "channel",
				status: "PUBLIC",
				password: "password",
				owner: "owner",
			};

			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.user.findUnique = jest.fn().mockImplementation(async (value) => value);
			prisma.channel.findUnique = jest.fn().mockResolvedValue(null);

			return request(app.getHttpServer()).post("/channel").send(payload).expect({
				statusCode: HttpStatus.BAD_REQUEST,
				message: "No password is required for public channels.",
			});
		});
	});

	describe("GET /channel", () => {
		it("should return an array of channel", async () => {
			const channels = [channel];

			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findMany = jest.fn().mockResolvedValue(channels);

			return request(app.getHttpServer()).get("/channel").expect(HttpStatus.OK).expect(channels);
		});
		it("should throw an exception saying the user is not authenticated", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(false);

			return request(app.getHttpServer()).get("/channel").expect({
				message: "Forbidden resource",
				error: "Forbidden",
				statusCode: HttpStatus.FORBIDDEN,
			});
		});
	});

	describe("GET /channel/:id", () => {
		const channelName = "channel";
		it("should find a channel by a given name and return it", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementation(async (data) => {
				if (data) return channel;
				return null;
			});

			return request(app.getHttpServer())
				.get(`/channel/${channelName}`)
				.expect(HttpStatus.OK)
				.expect(channel);
		});
		it("should throw an exception saying the user is not authenticated", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(false);

			return request(app.getHttpServer()).get(`/channel/${channelName}`).expect({
				message: "Forbidden resource",
				error: "Forbidden",
				statusCode: HttpStatus.FORBIDDEN,
			});
		});
		it("should throw a not found exception", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementation(async (data) => {
				if (data) return null;
				return channel;
			});

			return request(app.getHttpServer())
				.get(`/channel/${channelName}`)
				.expect({ statusCode: HttpStatus.BAD_REQUEST, message: "No such channel with that name!" });
		});
	});

	describe("PATCH /channel/:id", () => {
		const channelName = "channel";

		const payload = {
			name: "channel1",
			status: "PRIVATE",
			owner: "owner",
		};
		it("should find a channel by a given name and update its data", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data) return channel;
				return null;
			});

			prisma.channel.update = jest.fn().mockImplementationOnce(async (query) => {
				return {
					...channel,
					...query.data,
				};
			});

			return request(app.getHttpServer())
				.patch(`/channel/${channelName}`)
				.send(payload)
				.expect(HttpStatus.OK)
				.expect({
					...channel,
					...payload,
					owner: {
						connect: {
							username: channel.ownerId,
						},
					},
				});
		});
		it("should throw a not found exception", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data) return null;
				return channel;
			});

			return request(app.getHttpServer())
				.patch(`/channel/${channelName}`)
				.send(payload)
				.expect({ statusCode: HttpStatus.BAD_REQUEST, message: "No such channel with that name!" });
		});
		it("should throw a not the owner exception", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data)
					return {
						name: "channel",
						status: "PUBLIC",
						owner: "owner1",
					};
				return null;
			});

			return request(app.getHttpServer()).patch(`/channel/${channelName}`).send(payload).expect({
				statusCode: HttpStatus.BAD_REQUEST,
				message: "You're not the owner of the channel",
			});
		});
		it("should throw an excpetion when no password is set for protected channels", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data) return channel;
				return null;
			});

			return request(app.getHttpServer())
				.patch(`/channel/${channelName}`)
				.send({ ...payload, status: "PROTECTED" })
				.expect({
					statusCode: HttpStatus.BAD_REQUEST,
					message: "Password must be set for protected channels.",
				});
		});
		it("should throw an excpetion when a password is set for public channels", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data) return channel;
				return null;
			});

			return request(app.getHttpServer())
				.patch(`/channel/${channelName}`)
				.send({ ...payload, password: "password", status: "PUBLIC" })
				.expect({
					statusCode: HttpStatus.BAD_REQUEST,
					message: "No password is required for public channels.",
				});
		});
		it("should throw a not found exception", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementation(async (data) => {
				if (data) return channel;
				return null;
			});

			return request(app.getHttpServer())
				.patch(`/channel/${channelName}`)
				.send(payload)
				.expect({ statusCode: HttpStatus.BAD_REQUEST, message: "Channel name already taken!" });
		});
	});
	describe("DELETE /channel/:id", () => {
		const channelName = "channel";
		it("should find a channel by a given name and delete it", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementation(async (data) => {
				if (data) return channel;
				return null;
			});

			prisma.channel.delete = jest.fn().mockImplementation(async (_) => channel);

			return request(app.getHttpServer())
				.delete(`/channel/${channelName}`)
				.expect(HttpStatus.OK)
				.expect(channel);
		});
		it("should throw an exception saying the user is not authenticated", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(false);

			return request(app.getHttpServer()).delete(`/channel/${channelName}`).expect({
				message: "Forbidden resource",
				error: "Forbidden",
				statusCode: HttpStatus.FORBIDDEN,
			});
		});
		it("should throw a not found exception", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementation(async (data) => {
				if (data) return null;
				return channel;
			});

			return request(app.getHttpServer())
				.delete(`/channel/${channelName}`)
				.expect({ statusCode: HttpStatus.BAD_REQUEST, message: "No such channel with that name!" });
		});
		it("should throw a not the owner exception", async () => {
			jest.spyOn(gaurd, "canActivate").mockResolvedValueOnce(true);
			prisma.channel.findUnique = jest.fn().mockImplementationOnce(async (data) => {
				if (data)
					return {
						name: "channel",
						status: "PUBLIC",
						owner: "owner1",
					};
				return null;
			});

			return request(app.getHttpServer()).delete(`/channel/${channelName}`).expect({
				statusCode: HttpStatus.BAD_REQUEST,
				message: "You're not the owner of the channel",
			});
		});
	});
});
