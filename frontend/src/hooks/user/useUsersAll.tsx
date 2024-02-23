import axiosClient from "@/lib/axios";
import { userSchema } from "@/lib/types/user/user";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseUserProfiles = (data: unknown) => {
	const result = z.array(userSchema).safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into a User Profile Array ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async () => {
	return await axiosClient.get(`/user/`).then(({ data }) => parseUserProfiles(data));
};

const useUsersAll = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["users-all"],
		queryFn: fetchData,
		retry: false,
	});

	return { data, isLoading, isError, error };
};

export default useUsersAll;
