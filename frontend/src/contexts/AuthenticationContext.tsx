import { AuthenticatedUser } from "@/lib/types/user/authenticated-user";
import { Dispatch, SetStateAction, createContext } from "react";

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
