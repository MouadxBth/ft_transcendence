import axiosClient from "@/lib/axios";
import { leaderboardMemberSchema } from "@/lib/types/game/leaderboard-member";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseLeaderboard = async (data: unknown) => {
	const result = z.array(leaderboardMemberSchema).safeParse(data);

	if (!result || !result.success) {
		console.error(result.error);
		throw new Error(
			`Unable to parse data into an array of Leaderboard Member ${result.error.message}`
		);
	}

	return result.data;
};

const fetchData = async () => {
	return await axiosClient.get(`/elo/leaderboard`).then(({ data }) => parseLeaderboard(data));
};

const useLeaderboard = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		staleTime: 5 * 1e3,
		queryKey: ["leaderboard"],
		queryFn: fetchData,
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useLeaderboard;
