"use client";

import { AuthenticationContext } from "@/contexts/AuthenticationContext";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import { AuthenticatedUser } from "@/lib/types/user/authenticated-user";
import { useEffect, useState } from "react";

const AuthenticationContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(null);
	const { data, isLoading, isSuccess, isError, error } = useAuthenticatedUser();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isLoading) return;

		setLoading(false);

		if (isError) return;

		setAuthenticatedUser(data ?? null);
	}, [data, isLoading, isError, isSuccess, error]);

	if (isLoading) return null;

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
