import axiosClient from "@/lib/axios";
import { friendStatusSchema } from "@/lib/types/friend/friend-status";
import { useQuery } from "@tanstack/react-query";

const parseFriendStatus = (data: unknown) => {
	const result = friendStatusSchema.safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into a Friend Status Type ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient
		.get(`/friend/status/${username}`)
		.then(({ data }) => parseFriendStatus(data));
};

const useFriendStatus = (username: string) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["friend-status", username],
		queryFn: async () => fetchData(username),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useFriendStatus;
