import { AuthenticationContext } from "@/contexts/AuthenticationContext";
import { useContext } from "react";

export const useAuthentication = () => {
	const context = useContext(AuthenticationContext);

	if (!context)
		throw new Error(`useAuthentication hook must be used inside an AuthenticationContextProvider`);

	return context;
};
