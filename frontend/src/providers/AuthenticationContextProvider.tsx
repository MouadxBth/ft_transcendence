"use client";

import { AuthenticationContext } from "@/contexts/AuthenticationContext";
import useProfile from "@/hooks/useProfile";
import axiosClient from "@/lib/axios";
import { AuthenticatedUser, authenticatedUserSchema } from "@/lib/types/authenticated-user";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const parseUserProfile = (data: unknown) => {
	const result = authenticatedUserSchema.safeParse(data);

	if (!result || !result.success)
		throw new Error(`Unable to parse data into a User Profile ${result.error.message}`);

	return result.data;
};

const useAuthProfile = (username: string | null) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["auth-profile"],
		queryFn: async () => {
			console.log("================ SENDING AUTH PROFILE REQUEST");
			return await axiosClient
				.get(username ? `/user/${username}` : "/auth/profile")
				.then(({ data }) => parseUserProfile(data));
		},
	});

	return { data, isLoading, isSuccess, isError, error };
};

const AuthenticationContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(null);
	const [loading, setLoading] = useState(true);
	const { data, isLoading, isSuccess, isError, error } = useAuthProfile(null);

	useEffect(() => {
		if (isLoading) {
			console.log("AUTH PROVIDER LOADING");
			setLoading(true);
			return;
		}

		console.log("AUTH PROVIDER DONE LOADING");

		setLoading(false);

		if (isSuccess) {
			console.log("AUTH PROVIDER SUCCESSFULL");
		} else {
			console.log("AUTH PROVIDER NOT SUCCESSFULL");
		}

		if (data === null || data === undefined) {
			console.log("AUTH PROVIDER USER NOT FOUND!");
		} else {
			console.log("AUTH PROVIDER USER FOUND ", data);
		}

		if (isError) {
			console.log("AUTH PROVIDER ERROR ", error);
			return;
		}

		setAuthenticatedUser(data ?? null);
	}, [data, isLoading, isError, isSuccess, error]);

	if (isLoading) {
		console.log("AUTH PROVIDER RETURNING NULL");
		return null;
	}

	console.log("AUTH PROVIDER NOT RETURNING NULL");

	return (
		<AuthenticationContext.Provider
			value={{
				authenticatedUser,
				setAuthenticatedUser,
				isLoading: loading,
				isError,
				error,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};

export default AuthenticationContextProvider;
