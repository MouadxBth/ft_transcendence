import axiosClient from "@/lib/axios";
import { achievementSchema } from "@/lib/types/achievement/achievement";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const parseAchievements = (data: unknown) => {
	const achievementsSchema = z.array(achievementSchema);
	const result = achievementsSchema.safeParse(data);

	if (!result || !result.success)
		throw new Error(`Unable to parse data into an array of Achievement ${result.error.message}`);

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient
		.get(`/achievement/${username}`)
		.then(({ data }) => parseAchievements(data));
};

const useAchievementsFetch = (username: string) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["achievements", username],
		queryFn: async () => fetchData(username),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useAchievementsFetch;
