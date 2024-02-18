import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import axiosClient from "@/lib/axios";
import { channelSchema } from "@/lib/types/channel/channel";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseChannelsFind = async (data: unknown) => {
	const result = z.array(channelSchema).safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into an array of Channel ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient
		.get(`/channel/joinable/${username}`)
		.then(({ data }) => parseChannelsFind(data));
};

const useChannelsFind = () => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["channels-find", authenticatedUser?.user.username!],
		queryFn: async () => fetchData(authenticatedUser?.user.username!),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useChannelsFind;
