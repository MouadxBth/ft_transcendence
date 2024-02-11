import { SocketsContext } from "@/contexts/SocketsContext";
import { useContext } from "react";

const useSockets = () => {
	const context = useContext(SocketsContext);

	if (!context)
		throw new Error(`useAuthentication hook must be used inside a SocketsContextProvider`);

	return context;
};

export default useSockets;
