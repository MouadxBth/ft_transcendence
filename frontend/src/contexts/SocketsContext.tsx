import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface SocketsContextType {
	notifications?: Socket;
}

export const SocketsContext = createContext<SocketsContextType>({
	notifications: undefined,
});
