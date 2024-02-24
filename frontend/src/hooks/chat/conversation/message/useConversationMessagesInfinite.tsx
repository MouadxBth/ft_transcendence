import axiosClient from "@/lib/axios";
import { conversationMessageSchema } from "@/lib/types/conversation/conversation-message";
import { useInfiniteQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseConversationMessages = async (data: unknown) => {
	const result = z.array(conversationMessageSchema).safeParse(data);

	if (!result || !result.success) {
		throw new Error(
			`Unable to parse data into an array of Conversation Message ${result.error.message}`
		);
	}

	return result.data;
};

const fetchData = async ({ target, cursor }: { target: string; cursor: number }) => {
	return await axiosClient
		.get(`/conversation/${target}/dms?quantity=11&cursor=${cursor}`)
		.then(({ data }) => parseConversationMessages(data));
};

const useConversationMessagesInfinite = (target: string) => {
	const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		retry: false,

		queryKey: ["conversation-messages-infinite", target],
		queryFn: ({ pageParam }) => fetchData(pageParam),

		initialPageParam: {
			target: target,
			cursor: -1,
		},

		select: (data) => ({
			pages: [...data.pages].reverse(),
			pageParams: [...data.pageParams].reverse(),
		}),

		getNextPageParam: (lastPage) => {
			if (lastPage.length < 11) return undefined;
			return {
				target: target,
				cursor: lastPage[0].id,
			};
		},
	});

	return { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage };
};

export default useConversationMessagesInfinite;
