import { Test, TestingModule } from "@nestjs/testing";
import { ChannelService } from "../channel.service";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { PrismaService } from "src/prisma/prisma.service";
import { Channel, User } from "@prisma/client";
import { CreateChannelDto } from "../dto/create-channel.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UpdateChannelDto } from "../dto/update-channel.dto";

describe("ChannelService", () => {
	let service: ChannelService;
	let prisma: DeepMocked<PrismaService>;

	const channel = {
		name: "channel",
		status: "PUBLIC",
		ownerId: "owner",
	} as Channel;

	const user = {
		username: "owner",
		password: "password",
		avatar: "https://images/aatrox.jpeg",
	} as User;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ChannelService],
		})
			.useMocker(createMock)
			.compile();

		service = module.get(ChannelService);
		prisma = module.get(PrismaService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("(ChannelService) should be defined", () => {
		expect(service).toBeDefined();
	});

	it("(PrismaService) should be defined", () => {
		expect(prisma).toBeDefined();
	});

	describe("create", () => {
		it("should create a new channel given all its data and return a its data", async () => {
			const createChannelDto = {
				name: "channel",
				status: "PUBLIC",
			} as CreateChannelDto;

			const findQeury = {
				where: { name: createChannelDto.name },
			};

			const createQeury = {
				data: {
					...createChannelDto,
					owner: {
						connect: {
							username: user.username,
						},
					},
				},
			};

			prisma.user.findUnique = jest.fn().mockImplementation(async (value) => value);
			prisma.channel.findUnique = jest.fn().mockResolvedValue(null);
			prisma.channel.create = jest.fn().mockResolvedValue(channel);

			const result = await service.create(createChannelDto, user);
			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenCalledWith(findQeury);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQeury);

			expect(prisma.channel.create).toHaveBeenCalledTimes(1);
			expect(prisma.channel.create).toHaveBeenCalledWith(createQeury);
			expect(prisma.channel.create).toHaveBeenNthCalledWith(1, createQeury);

			expect(result).toEqual(channel);
		});

		it("should throw an excpetion saying the channel name already exists", async () => {
			const createChannelDto = {
				name: "channel",
				status: "PUBLIC",
			} as CreateChannelDto;

			const findQeury = {
				where: { name: createChannelDto.name },
			};

			prisma.channel.findUnique = jest.fn().mockImplementation(async (value) => value);

			try {
				await service.create(createChannelDto, user);
				fail("Expected an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe("Channel name already taken!");
			}
			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenCalledWith(findQeury);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQeury);
		});

		it("should throw an excpetion when no password is set for protected channels", async () => {
			const createChannelDto = {
				name: "channel",
				status: "PROTECTED",
			} as CreateChannelDto;

			const findQeury = {
				where: { name: createChannelDto.name },
			};

			prisma.user.findUnique = jest.fn().mockImplementation(async (value) => value);
			prisma.channel.findUnique = jest.fn().mockResolvedValue(null);

			try {
				await service.create(createChannelDto, user);
				fail("Expected an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe(
					"Password must be set for protected channels."
				);
			}
			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenCalledWith(findQeury);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQeury);
		});
		it("should throw an excpetion when a password is set for public channels", async () => {
			const createChannelDto = {
				name: "channel",
				status: "PUBLIC",
				password: "password",
			} as CreateChannelDto;

			const findQeury = {
				where: { name: createChannelDto.name },
			};

			prisma.user.findUnique = jest.fn().mockImplementation(async (value) => value);
			prisma.channel.findUnique = jest.fn().mockResolvedValue(null);

			try {
				await service.create(createChannelDto, user);
				fail("Expected an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe(
					"No password is required for public channels."
				);
			}
			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenCalledWith(findQeury);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQeury);
		});
	});

	describe("findAll", () => {
		it("should return an array of channels", async () => {
			const channels = [channel];
			prisma.channel.findMany = jest.fn().mockResolvedValue(channels);

			const result = await service.findAll();

			expect(prisma.channel.findMany).toHaveBeenCalled();
			expect(prisma.channel.findMany).toHaveBeenCalledTimes(1);

			expect(result.length).toBe(1);
			expect(result).toContainEqual(channel);
			expect(result).toStrictEqual(channels);
		});
	});

	describe("findOne", () => {
		it("should find a channel by a given name and return its data", async () => {
			const channelName = "channel";
			const findQeury = {
				where: { name: channelName },
			};

			prisma.channel.findUnique = jest.fn().mockResolvedValue(channel);

			const result = await service.findOne(channelName);

			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQeury);

			expect(result).toEqual(channel);
		});
		it("should throw an exception when no channel exists with given name!", async () => {
			const channelName = "unknown";
			const findQeury = {
				where: { name: channelName },
			};

			prisma.channel.findUnique = jest.fn().mockResolvedValue(null);

			try {
				await service.findOne(channelName);
				fail("Expected an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toBe(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe("No such channel with that name!");
			}

			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQeury);
		});
	});

	describe("update", () => {
		const channelName = "channel";
		const updateChannelDto = {
			name: "channel1",
			status: "PRIVATE",
		} as UpdateChannelDto;
		it("should find a channel by a given name and update its data", async () => {
			const expectedChannel = {
				...channel,
				...updateChannelDto,
				owner: {
					connect: {
						username: user.username,
					},
				},
			};
			const findQuery = {
				where: { name: channelName },
			};

			const updateQuery = {
				where: { name: channelName },
				data: {
					...updateChannelDto,
					owner: {
						connect: {
							username: user.username,
						},
					},
				},
			};

			prisma.channel.findUnique = jest.fn().mockImplementationOnce((value) => {
				value;
				return channel;
			});
			prisma.channel.update = jest.fn().mockImplementationOnce(async (qeury) => {
				return {
					...channel,
					...qeury.data,
				};
			});

			const result = await service.update(channelName, updateChannelDto, user);

			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(2);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQuery);

			expect(prisma.channel.update).toHaveBeenCalledTimes(1);
			expect(prisma.channel.update).toHaveBeenNthCalledWith(1, updateQuery);

			expect(result).toEqual(expectedChannel);
		});
		it("should throw an excpetion saying the channel doesn't exist", async () => {
			const findQuery = {
				where: { name: channelName },
			};

			prisma.channel.findUnique = jest.fn().mockResolvedValueOnce(null);
			prisma.channel.update = jest.fn().mockImplementationOnce(async (qeury) => {
				return {
					...channel,
					...qeury.data,
				};
			});

			try {
				await service.update(channelName, updateChannelDto, user);
				fail("Expected an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toEqual(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe("No such channel with that name!");
			}

			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQuery);

			expect(prisma.channel.update).toHaveBeenCalledTimes(0);
		});
		it("should throw an excpetion saying the channel name is already taken", async () => {
			const findQuery = {
				where: { name: channelName },
			};

			prisma.channel.findUnique = jest.fn().mockResolvedValue(channel);
			prisma.channel.update = jest.fn().mockImplementationOnce(async (qeury) => {
				return {
					...channel,
					...qeury.data,
				};
			});

			try {
				await service.update(channelName, updateChannelDto, user);
				fail("Expected an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toEqual(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe("Channel name already taken!");
			}

			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(2);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQuery);

			expect(prisma.channel.update).toHaveBeenCalledTimes(0);
		});
		it("should throw an excpetion when someone other than the owner of a channel tries to update it", async () => {
			const findQuery = {
				where: { name: channelName },
			};

			const wrongUser = {
				...user,
				username: "notowner",
			};

			prisma.channel.findUnique = jest.fn().mockImplementationOnce((value) => {
				value;
				return channel;
			});
			prisma.channel.update = jest.fn().mockImplementationOnce(async (qeury) => {
				return {
					...channel,
					...qeury.data,
				};
			});

			try {
				await service.update(channelName, updateChannelDto, wrongUser);
				fail("Expected an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toEqual(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe("You're not the owner of the channel");
			}

			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQuery);

			expect(prisma.channel.update).toHaveBeenCalledTimes(0);
		});
		it("should throw an excpetion when no password is set for protected channels", async () => {
			const findQuery = {
				where: { name: channelName },
			};
			const wrongUpdateChannelDto = {
				...updateChannelDto,
				status: "PROTECTED",
			} as UpdateChannelDto;

			prisma.channel.findUnique = jest.fn().mockImplementationOnce((value) => {
				value;
				return channel;
			});
			prisma.channel.update = jest.fn().mockImplementationOnce(async (qeury) => {
				return {
					...channel,
					...qeury.data,
				};
			});

			try {
				await service.update(channelName, wrongUpdateChannelDto, user);
				fail("Expected an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toEqual(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe(
					"Password must be set for protected channels."
				);
			}

			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQuery);

			expect(prisma.channel.update).toHaveBeenCalledTimes(0);
		});
		it("should throw an excpetion when a password is set for public channels", async () => {
			const findQuery = {
				where: { name: channelName },
			};
			const wrongUpdateChannelDto = {
				...updateChannelDto,
				status: "PUBLIC",
				password: "password",
			} as UpdateChannelDto;

			prisma.channel.findUnique = jest.fn().mockImplementationOnce((value) => {
				value;
				return channel;
			});
			prisma.channel.update = jest.fn().mockImplementationOnce(async (qeury) => {
				return {
					...channel,
					...qeury.data,
				};
			});

			try {
				await service.update(channelName, wrongUpdateChannelDto, user);
				fail("Expected an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toEqual(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe(
					"No password is required for public channels."
				);
			}

			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQuery);

			expect(prisma.channel.update).toHaveBeenCalledTimes(0);
		});
	});
	describe("remove", () => {
		const channelName = "channel";
		it("should find a channel by a given name and remove it", async () => {
			const findQeury = {
				where: { name: channelName },
			};

			prisma.channel.findUnique = jest.fn().mockImplementationOnce((value) => {
				value;
				return channel;
			});
			prisma.channel.delete = jest.fn().mockResolvedValueOnce(channel);

			const result = await service.remove(channelName, user);

			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQeury);

			expect(prisma.channel.delete).toHaveBeenCalledTimes(1);
			expect(prisma.channel.delete).toHaveBeenNthCalledWith(1, findQeury);

			expect(result).toEqual(channel);
		});
		it("should throw an excpetion saying the channel doesn't exist", async () => {
			const findQeury = {
				where: { name: channelName },
			};

			prisma.channel.findUnique = jest.fn().mockResolvedValueOnce(null);
			prisma.channel.delete = jest.fn().mockResolvedValueOnce(channel);

			try {
				await service.remove(channelName, user);
				fail("Expected an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toEqual(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe("No such channel with that name!");
			}

			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQeury);

			expect(prisma.channel.delete).toHaveBeenCalledTimes(0);
		});

		it("should throw an excpetion when someone other than the owner of a channel tries to remove it", async () => {
			const findQeury = {
				where: { name: channelName },
			};

			const wrongUser = {
				...user,
				username: "notowner",
			};

			prisma.channel.findUnique = jest.fn().mockImplementationOnce((value) => {
				value;
				return channel;
			});
			prisma.channel.delete = jest.fn().mockResolvedValueOnce(channel);

			try {
				await service.remove(channelName, wrongUser);
				fail("Expected an exception to be thrown!");
			} catch (exception: unknown) {
				expect(exception).toBeInstanceOf(HttpException);
				expect((exception as HttpException).getStatus()).toEqual(HttpStatus.BAD_REQUEST);
				expect((exception as HttpException).message).toBe("You're not the owner of the channel");
			}

			expect(prisma.channel.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.channel.findUnique).toHaveBeenNthCalledWith(1, findQeury);

			expect(prisma.channel.delete).toHaveBeenCalledTimes(0);
		});
	});
});
