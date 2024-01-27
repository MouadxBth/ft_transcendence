import axiosClient from "@/lib/axios";
import { blockStatusSchema } from "@/lib/types/block-status";
import { useQuery } from "@tanstack/react-query";

export const parseBlockStatus = (data: unknown) => {
	const result = blockStatusSchema.safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into a Block Status Result ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient.get(`/blocked/${username}`).then(({ data }) => parseBlockStatus(data));
};

const useBlockStatus = (username: string) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["block", username],
		queryFn: () => fetchData(username),
		retry: false,
	});

	return { data, isLoading, isError, error };
};

export default useBlockStatus;
