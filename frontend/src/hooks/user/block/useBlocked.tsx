import axiosClient from "@/lib/axios";
import { blockStatusSchema } from "@/lib/types/block/block-status";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseBlocked = (data: unknown) => {
	const result = z.array(z.string()).safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into a Blocked result ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async () => {
	return await axiosClient.get(`/blocked/all`).then(({ data }) => parseBlocked(data));
};

const useBlocked = (username: string) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["blocked", username],
		queryFn: fetchData,
		retry: false,
	});

	return { data, isLoading, isError, error };
};

export default useBlocked;
