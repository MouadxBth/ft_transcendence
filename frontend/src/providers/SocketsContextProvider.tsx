"use client";

import { SocketsContext } from "@/contexts/SocketsContext";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { AuthenticatedUser } from "@/lib/types/authenticated-user";
import { useEffect, useState } from "react";
import { ManagerOptions, Socket, SocketOptions, io } from "socket.io-client";

const initializer = (user: AuthenticatedUser | null) => {
	const uri = process.env.NEXT_PUBLIC_BACKEND_ORIGIN;
	const options = {
		withCredentials: true,
		transports: ["websocket"],
		autoConnect: user !== null,
	} satisfies Partial<ManagerOptions & SocketOptions>;

	return io(uri + "/notifications", options);
};

const SocketsContextProvider = ({ children }: { children: React.ReactNode }) => {
	const { authenticatedUser } = useAuthentication();
	const [notifications, setNotifications] = useState<Socket | undefined>(undefined);

	useEffect(() => {
		const socket = initializer(authenticatedUser);

		setNotifications(socket);

		return () => {
			socket.disconnect();
		};
	}, [authenticatedUser]);

	return (
		<SocketsContext.Provider
			value={{
				notifications,
			}}
		>
			{children}
		</SocketsContext.Provider>
	);
};

export default SocketsContextProvider;
