import axiosClient from "@/lib/axios";
import { channelMessageSchema } from "@/lib/types/chat/channel/channel-message";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseChannelMessages = async (data: unknown) => {
	console.log(data);
	const result = z.array(channelMessageSchema).safeParse(data);

	if (!result || !result.success) {
		console.log(result.error);
		throw new Error(
			`Unable to parse data into an array of Channel Message ${result.error.message}`
		);
	}

	return result.data;
};

const fetchData = async (channel: string) => {
	return await axiosClient
		.get(`/channel/${channel}/messages?quantity=10`)
		.then(({ data }) => parseChannelMessages(data));
};

const useChannelMessage = (channel: string) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["channel-messages", channel],
		queryFn: async () => fetchData(channel),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useChannelMessage;
