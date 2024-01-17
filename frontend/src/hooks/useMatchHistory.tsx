import axiosClient from "@/lib/axios";
import { matchHistorySchema } from "@/lib/types/match-history";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const parseMatchHistory = (data: unknown) => {
	const matchHistoryArraySchema = z.array(matchHistorySchema);
	const result = matchHistoryArraySchema.safeParse(data);

	if (!result || !result.success)
		throw new Error(`Unable to parse data into an array of Match History ${result.error.message}`);

	return result.data;
};

const useMatchHistory = (username: string | null) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["match-history"],
		queryFn: async () => {
			console.log("================ SENDING MATCH HISTORY REQUEST");
			return await axiosClient
				.get(username ? `/match/history/${username}` : "/match/history/")
				.then(({ data }) => parseMatchHistory(data));
		},
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useMatchHistory;
