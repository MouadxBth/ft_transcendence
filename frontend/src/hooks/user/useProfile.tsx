import axiosClient from "@/lib/axios";
import { userSchema } from "@/lib/types/user";
import { useQuery } from "@tanstack/react-query";

export const parseUserProfile = async (data: unknown) => {
	const result = userSchema.safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into a User Profile ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (username: string) => {
	return await axiosClient.get(`/user/${username}`).then(({ data }) => parseUserProfile(data));
};

const useProfile = (username: string) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["profile", username],
		queryFn: async () => fetchData(username),
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useProfile;
