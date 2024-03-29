import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface SocketsContextType {
	notifications?: Socket;
	conversations?: Socket;
	channels?: Socket;
}

export const SocketsContext = createContext<SocketsContextType>({
	notifications: undefined,
	conversations: undefined,
	channels: undefined,
});
