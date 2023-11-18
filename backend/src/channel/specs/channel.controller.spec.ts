import { Test, TestingModule } from "@nestjs/testing";
import { ChannelController } from "../channel.controller";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { ChannelService } from "../channel.service";
import { Channel } from "@prisma/client";
import { CreateChannelDto } from "../dto/create-channel.dto";
import { UpdateChannelDto } from "../dto/update-channel.dto";

describe("ChannelController", () => {
	let controller: ChannelController;	
	let service: DeepMocked<ChannelService>;

	const channel = {
		name: "channel",
		status: "PUBLIC",
		ownerId: "owner"
	} as Channel;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ChannelController],
		}).useMocker(createMock).compile();
	controller = module.get(ChannelController);
	service = module.get(ChannelService);
	})

	afterEach(async () => {
		jest.clearAllMocks();
	})

	it("(ChannelController) should be defined", async () =>{
		expect(controller).toBeDefined();
	})

	it("(ChannelService) should be defined", async () =>{
		expect(service).toBeDefined();
	})
	
	describe("create",  () => {
		beforeEach(() => {
			jest.spyOn(service, "create")
		})

		it("should be defined",  () => {
			expect(service.create).toBeDefined();
		})

		it("should create a new channel with given data", async () => {

			const createChannelDto = {
				name: "channel",
				status: "PUBLIC",
				owner: "owner",
			} as CreateChannelDto;

			service.create.mockResolvedValueOnce(channel);

			const result = await controller.create(createChannelDto);

			expect(service.create).toHaveBeenCalled();
			expect(service.create).toHaveBeenCalledWith(createChannelDto);

			expect(result).toEqual(channel);
		}
		)
	})

	describe("findAll", () => {
		beforeEach(async () => {
			jest.spyOn(service, "findAll");
		})

		it("should be defined", () => {
			expect(service.findAll).toBeDefined();
		})

		it("should return an array of channel", async () => {
			const channels = [channel];

			service.findAll.mockResolvedValueOnce(channels);

			const result = await controller.findAll();

			expect(service.findAll).toHaveBeenCalled();
			expect(result).toEqual(channels);
		})
	})

	describe("findOne", () => {
		beforeEach(() => {
			jest.spyOn(service, "findOne");
		})

		it("should be defined", () => {
				expect(service.findOne).toBeDefined();
		})

		it("should find a channel by a given name and return it", async () => {

			const channelName = "channel";

			service.findOne.mockResolvedValueOnce(channel);

			const result = await controller.findOne(channelName);

			expect(service.findOne).toHaveBeenCalled();
			expect(service.findOne).toHaveBeenCalledWith(channelName);

			expect(result).toEqual(channel);
		})
	})

	describe("update", () => {
		beforeEach(() => {
			jest.spyOn(service, "update")
		})

		it("should be defined", () => {
			expect(service.update).toBeDefined();
		})

		it("should find a channnel by a given name and update its data", async () => {
				const channelName = "owner";

				const updateChannelDto = {
					name: "channel1",
					status: "PRIVATE",
					owner: "owner",
				} as UpdateChannelDto;

				service.update.mockImplementationOnce(async (_, data: any) => {
					return ({
						...channel,
						...data,
				})
				})
				const result = await controller.update(channelName, updateChannelDto);

				expect(service.update).toHaveBeenCalled();
				expect(service.update).toHaveBeenCalledWith(channelName, updateChannelDto);
				
				expect(result).toEqual({...channel, ...updateChannelDto});
		})
	})

	describe("remove", () => {
		beforeEach(() => {
			jest.spyOn(service, "remove")
		})

		it("should be defined", () => {
			expect(service.remove).toBeDefined();
		})

		it("should find a channnel by a given name and remove it", async () => {
			const channelName = "owner";

			service.remove.mockResolvedValueOnce(channel);

			const result = await controller.remove(channelName);

			expect(service.remove).toHaveBeenCalled();
			expect(service.remove).toHaveBeenCalledWith(channelName);

			expect(result).toEqual(channel);
		})
	})
});
