import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import axiosClient from "@/lib/axios";
import { channelSchema } from "@/lib/types/channel/channel";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseChannelsInvited = async (data: unknown) => {
	const result = z.array(channelSchema).safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into an array of Channel ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient
		.get(`/channel/invited/${username}`)
		.then(({ data }) => parseChannelsInvited(data));
};

const useChannelsInvited = () => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["channels-invited", authenticatedUser?.user.username!],
		queryFn: async () => fetchData(authenticatedUser?.user.username!),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useChannelsInvited;
