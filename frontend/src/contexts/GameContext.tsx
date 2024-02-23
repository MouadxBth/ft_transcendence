import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface GameContextType {
	game?: Socket;
}

export const GameContext = createContext<GameContextType>({
	game: undefined,
});
