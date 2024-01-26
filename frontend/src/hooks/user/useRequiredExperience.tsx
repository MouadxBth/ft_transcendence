import axiosClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseRequiredExperience = async (data: unknown) => {
	const result = z.number().safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into a User Profile ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient
		.get(`/level/required/${username}`)
		.then(({ data }) => parseRequiredExperience(data));
};

const useRequiredExperience = (username: string) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["required-experience", username],
		queryFn: async () => fetchData(username),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useRequiredExperience;
