import axiosClient from "@/lib/axios";
import { channelSchema } from "@/lib/types/channel/channel";
import { useQuery } from "@tanstack/react-query";

export const parseChannel = async (data: unknown) => {
	const result = channelSchema.safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into an array of Channel ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (channel: string) => {
	return await axiosClient.get(`/channel/${channel}`).then(({ data }) => parseChannel(data));
};

const useChannel = (channel: string) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["channel", channel],
		queryFn: async () => fetchData(channel),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useChannel;
