"use client";

import { SocketsContext } from "@/contexts/SocketsContext";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { AuthenticatedUser } from "@/lib/types/user/authenticated-user";
import { useEffect, useState } from "react";
import { ManagerOptions, Socket, SocketOptions, io } from "socket.io-client";

const initializer = (user: AuthenticatedUser | null) => {
	const uri = process.env.NEXT_PUBLIC_BACKEND_ORIGIN;

	const options = {
		withCredentials: true,
		transports: ["websocket"],
		autoConnect: user !== null,
	} satisfies Partial<ManagerOptions & SocketOptions>;

	const result = {
		notificationsSocket: io(uri + "/notifications", options),
		conversationSocket: io(uri + "/conversation", options),
		channelSocket: io(uri + "/channel", options),
		gameSocket: io(uri + "/game", options),
	};

	return result;
};

const SocketsContextProvider = ({ children }: { children: React.ReactNode }) => {
	const { authenticatedUser } = useAuthentication();
	const [notifications, setNotifications] = useState<Socket | undefined>(undefined);
	const [conversations, setConversations] = useState<Socket | undefined>(undefined);
	const [channels, setChannels] = useState<Socket | undefined>(undefined);
	const [game, setGame] = useState<Socket | undefined>(undefined);

	useEffect(() => {
		const { notificationsSocket, conversationSocket, channelSocket, gameSocket } =
			initializer(authenticatedUser);

		setNotifications(notificationsSocket);
		setConversations(conversationSocket);
		setChannels(channelSocket);
		setGame(gameSocket)

		return () => {
			notificationsSocket.offAny();
			conversationSocket.offAny();
			channelSocket.offAny();
			gameSocket.offAny();

			if (notificationsSocket.connected) notificationsSocket.disconnect();
			if (conversationSocket.connected) conversationSocket.disconnect();
			if (channelSocket.connected) channelSocket.disconnect();
			if (gameSocket.connected) gameSocket.disconnect();
		};
	}, [authenticatedUser]);

	return (
		<SocketsContext.Provider
			value={{
				notifications,
				conversations,
				channels,
				game,
			}}
		>
			{children}
		</SocketsContext.Provider>
	);
};

export default SocketsContextProvider;
