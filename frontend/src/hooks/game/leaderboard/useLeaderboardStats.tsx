import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import axiosClient from "@/lib/axios";
import { leaderboardMemberSchema } from "@/lib/types/game/leaderboard-member";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseLeaderboardStats = async (data: unknown) => {
	const result = leaderboardMemberSchema.safeParse(data);

	if (!result || !result.success) {
		console.error(result.error);
		throw new Error(
			`Unable to parse data into an array of Leaderboard Stats ${result.error.message}`
		);
	}

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient
		.get(`/elo/ranking/${username}`)
		.then(({ data }) => parseLeaderboardStats(data));
};

const useLeaderboardStats = () => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["leaderboard-stats", authenticatedUser?.user.username],
		queryFn: () => fetchData(authenticatedUser?.user.username!),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useLeaderboardStats;
