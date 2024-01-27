import axiosClient from "@/lib/axios";
import { friendSchema } from "@/lib/types/friend";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const parseFriends = (data: unknown) => {
	const result = z.array(friendSchema).safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into an array of Friend ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (username: string | null) => {
	return await axiosClient
		.get(username ? `/friend/${username}` : "/friend")
		.then(({ data }) => parseFriends(data));
};

const useFriendsFetch = (username: string | null) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["friends", username],
		queryFn: async () => fetchData(username),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useFriendsFetch;
