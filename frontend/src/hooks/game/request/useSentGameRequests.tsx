import axiosClient from "@/lib/axios";
import { gameRequestSchema } from "@/lib/types/game/game-request";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseSentGameRequests = async (data: unknown) => {
	const result = z.array(gameRequestSchema).safeParse(data);

	if (!result || !result.success) {
		console.error(result.error);
		throw new Error(`Unable to parse data into an array of Game Request ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async () => {
	return await axiosClient
		.get(`/game/request/sent`)
		.then(({ data }) => parseSentGameRequests(data));
};

const useSentGameRequests = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["sent-game-requests"],
		queryFn: fetchData,
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useSentGameRequests;
