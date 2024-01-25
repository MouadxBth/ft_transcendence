import axiosClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { userSchema } from "@/lib/types/user";

export const parseUserProfiles = (data: unknown) => {
	const result = z.array(userSchema).safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into a User Profile Array ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async (query: string) => {
	return await axiosClient.get(`/user/search/${query}`).then(({ data }) => parseUserProfiles(data));
};

const useUserSearch = (query: string) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["user-search", query],
		queryFn: () => fetchData(query),
		enabled: !!query,
		retry: false,
	});

	return { data, isLoading, isError, error };
};

export default useUserSearch;
