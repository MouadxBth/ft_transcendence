import axiosClient from "@/lib/axios";
import { channelSchema } from "@/lib/types/chat/channel/channel";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseChannels = async (data: unknown) => {
	const result = z.array(channelSchema).safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into an array of Channel ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async () => {
	return await axiosClient.get(`/channel/all`).then(({ data }) => parseChannels(data));
};

const useChannels = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["channels"],
		queryFn: async () => fetchData(),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useChannels;
