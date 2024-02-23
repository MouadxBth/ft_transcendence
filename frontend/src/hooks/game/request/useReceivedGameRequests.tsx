import axiosClient from "@/lib/axios";
import { gameRequestSchema } from "@/lib/types/game/game-request";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseReceivedGameRequests = async (data: unknown) => {
	const result = z.array(gameRequestSchema).safeParse(data);

	if (!result || !result.success) {
		console.error(result.error);
		throw new Error(`Unable to parse data into an array of Game Request ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async () => {
	return await axiosClient
		.get(`/game/request/received`)
		.then(({ data }) => parseReceivedGameRequests(data));
};

const useReceivedGameRequests = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		staleTime: 5 * 1e3,
		queryKey: ["received-game-requests"],
		queryFn: fetchData,
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useReceivedGameRequests;
