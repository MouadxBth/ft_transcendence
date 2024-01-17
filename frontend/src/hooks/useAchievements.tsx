import axiosClient from "@/lib/axios";
import { achievementSchema } from "@/lib/types/achievement";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const parseAchievements = (data: unknown) => {
	const achievementsSchema = z.array(achievementSchema);
	const result = achievementsSchema.safeParse(data);

	if (!result || !result.success)
		throw new Error(`Unable to parse data into an array of Achievement ${result.error.message}`);

	return result.data;
};

const useAchievements = (username: string | null) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["achievements"],
		queryFn: async () => {
			console.log("================ SENDING ACHIEVEMENTS REQUEST");
			return await axiosClient
				.get(username ? `/achievements/${username}` : "/achievements")
				.then(({ data }) => parseAchievements(data));
		},
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useAchievements;
