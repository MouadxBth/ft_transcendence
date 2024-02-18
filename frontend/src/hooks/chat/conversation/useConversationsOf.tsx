import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import axiosClient from "@/lib/axios";
import { conversationSchema } from "@/lib/types/conversation/conversation";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseConversationsOf = async (data: unknown) => {
	const result = z.array(conversationSchema).safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into an array of Conversation ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async () => {
	return await axiosClient.get(`/conversation`).then(({ data }) => parseConversationsOf(data));
};

const useConversationsOf = () => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["conversations", authenticatedUser?.user.username!],
		queryFn: fetchData,
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useConversationsOf;
