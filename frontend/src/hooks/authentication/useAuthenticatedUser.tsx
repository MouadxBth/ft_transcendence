import axiosClient from "@/lib/axios";
import { authenticatedUserSchema } from "@/lib/types/authenticated-user";
import { useQuery } from "@tanstack/react-query";

export const parseAuthenticatedUser = (data: unknown) => {
	const result = authenticatedUserSchema.safeParse(data);

	if (!result || !result.success)
		throw new Error(`Unable to parse data into an AuthenticatedUser ${result.error.message}`);

	return result.data;
};

const useAuthenticatedUser = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["authenticated-user"],
		queryFn: async () => {
			return await axiosClient
				.get("/auth/profile")
				.then(({ data }) => parseAuthenticatedUser(data));
		},
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useAuthenticatedUser;
