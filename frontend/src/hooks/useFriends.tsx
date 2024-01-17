import axiosClient from "@/lib/axios";
import { friendSchema } from "@/lib/types/friend";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const parseFriends = (data: unknown) => {
	console.log("FRIENDS ", data);
	const friendsSchema = z.array(friendSchema);
	const result = friendsSchema.safeParse(data);

	if (!result || !result.success)
		throw new Error(`Unable to parse data into an array of Friend ${result.error.message}`);

	return result.data;
};

const useFriends = (username: string | null) => {
	// username ? `/friend/${username}` :
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["friends"],
		queryFn: async () => {
			console.log("================ SENDING FRIENDS REQUEST");
			return await axiosClient.get("/friend").then(({ data }) => parseFriends(data));
		},
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useFriends;
