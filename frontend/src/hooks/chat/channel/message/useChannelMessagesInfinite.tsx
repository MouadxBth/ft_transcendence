import axiosClient from "@/lib/axios";
import { channelMessageSchema } from "@/lib/types/channel/channel-message";
import { useInfiniteQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseChannelMessages = async (data: unknown) => {
	const result = z.array(channelMessageSchema).safeParse(data);

	if (!result || !result.success) {
		throw new Error(
			`Unable to parse data into an array of Channel Message ${result.error.message}`
		);
	}

	return result.data;
};

const fetchData = async ({ channel, cursor }: { channel: string; cursor: number }) => {
	return await axiosClient
		.get(`/channel/${channel}/messages?quantity=10&cursor=${cursor}`)
		.then(({ data }) => parseChannelMessages(data));
};

const useChannelMessagesInfinite = (channel: string) => {
	const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		retry: false,
		queryKey: ["channel-messages-infinite", channel],
		queryFn: ({ pageParam }) => fetchData(pageParam),

		initialPageParam: {
			channel: channel,
			cursor: -1,
		},

		select: (data) => ({
			pages: [...data.pages].reverse(),
			pageParams: [...data.pageParams].reverse(),
		}),

		getNextPageParam: (lastPage) => {
			if (lastPage.length < 10) return undefined;
			return {
				channel: channel,
				cursor: lastPage[0].id,
			};
		},
	});

	return { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage };
};

export default useChannelMessagesInfinite;
