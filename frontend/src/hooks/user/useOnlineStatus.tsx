import axiosClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseOnlineStatus = (data: unknown) => {
	const result = z.boolean().safeParse(data);

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
