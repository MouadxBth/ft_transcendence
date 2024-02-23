import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import axiosClient from "@/lib/axios";
import { gameMatchSchema } from "@/lib/types/game/game-match";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseMatchHistory = async (data: unknown) => {
	const result = z.array(gameMatchSchema).safeParse(data);

	if (!result || !result.success) {
		console.error(result.error);
		throw new Error(`Unable to parse data into an array of Game Match ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient
		.get(`/match-history/player/${username}`)
		.then(({ data }) => parseMatchHistory(data));
};

const useMatchHistory = (username: string) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["match-history", username],
		queryFn: () => fetchData(username!),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useMatchHistory;
