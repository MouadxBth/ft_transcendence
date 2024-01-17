import axiosClient from "@/lib/axios";
import { authenticatedUserSchema } from "@/lib/types/authenticated-user";
import { userSchema } from "@/lib/types/user";
import { useQuery } from "@tanstack/react-query";

const parseUserProfile = (data: unknown) => {
	const result = userSchema.safeParse(data);

	console.log(data);

	if (!result || !result.success) {
		console.log(result.error);
		throw new Error(`Unable to parse data into a User Profile ${result.error.message}`);
	}

	console.log("RESULT ", result);

	return result.data;
};

const useProfile = (username: string | null) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["profile"],
		queryFn: async () => {
			console.log("================ SENDING PROFILE REQUEST");
			return await axiosClient.get(`/user/${username}`).then(({ data }) => parseUserProfile(data));
		},
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useProfile;
