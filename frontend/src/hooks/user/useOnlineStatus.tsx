import axiosClient from "@/lib/axios";
import { onlineStatusSchema } from "@/lib/types/user/online-status";
import { useQuery } from "@tanstack/react-query";

export const parseOnlineStatus = (data: unknown) => {
	const result = onlineStatusSchema.safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into an Online Status Result ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient
		.get(`/online-status/${username}`)
		.then(({ data }) => parseOnlineStatus(data));
};

const useOnlineStatus = (username: string) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["online-status", username],
		queryFn: () => fetchData(username),
		retry: false,
	});

	return { data, isLoading, isError, error };
};

export default useOnlineStatus;
