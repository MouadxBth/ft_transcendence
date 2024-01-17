import { AuthenticatedUser } from "@/lib/types/authenticated-user";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface AuthenticationContextType {
	authenticatedUser: AuthenticatedUser | null;
	setAuthenticatedUser: Dispatch<SetStateAction<AuthenticatedUser | null>>;
	isLoading: Boolean;
	isError: Boolean;
	error: Error | null;
}

export const AuthenticationContext = createContext<AuthenticationContextType>({
	authenticatedUser: null,
	setAuthenticatedUser: () => {},
	isLoading: false,
	isError: false,
	error: null,
});

export const useAuthentication = () => {
	const context = useContext(AuthenticationContext);

	if (!context)
		throw new Error(`useAuthentication hook must be used inside an AuthenticationContextProvider`);

	return context;
};
