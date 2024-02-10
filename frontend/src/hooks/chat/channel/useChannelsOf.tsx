import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import axiosClient from "@/lib/axios";
import { channelSchema } from "@/lib/types/chat/channel/channel";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseChannelsOf = async (data: unknown) => {
	const result = z.array(channelSchema).safeParse(data);

	console.log(data);

	if (!result || !result.success) {
		console.log(result.error);

		throw new Error(`Unable to parse data into an array of Channel ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient.get(`/channel/of/${username}`).then(({ data }) => parseChannelsOf(data));
};

const useChannelsOf = () => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["channels", authenticatedUser?.user.username!],
		queryFn: async () => fetchData(authenticatedUser?.user.username!),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useChannelsOf;
