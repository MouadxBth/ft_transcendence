import axiosClient from "@/lib/axios";
import { levelSchema } from "@/lib/types/user/level";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseLevel = async (data: unknown) => {
	const result = levelSchema.safeParse(data);

	if (!result || !result.success) {
		console.error(result.error);
		throw new Error(`Unable to parse data into Level Data ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient.get(`/level/required/${username}`).then(({ data }) => parseLevel(data));
};

const useLevel = (username: string) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["user-level", username],
		queryFn: async () => fetchData(username),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useLevel;
