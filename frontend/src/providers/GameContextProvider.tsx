import { useToast } from "@/components/ui/use-toast";
import { GameContext } from "@/contexts/GameContext";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { ErrorType } from "@/lib/types/error";
import { useState, useEffect } from "react";
import { ManagerOptions, SocketOptions, io, Socket } from "socket.io-client";

const initializer = () => {
	const uri = process.env.NEXT_PUBLIC_BACKEND_ORIGIN;

	const options = {
		withCredentials: true,
		transports: ["websocket"],
		autoConnect: true,
	} satisfies Partial<ManagerOptions & SocketOptions>;

	const result = {
		gameSocket: io(uri + "/game", options),
	};

	return result;
};

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [game, setGame] = useState<Socket | undefined>(undefined);
	const { authenticatedUser } = useAuthentication();
	const { toast } = useToast();

	useEffect(() => {
		const { gameSocket } = initializer();

		setGame(gameSocket);

		gameSocket.connect();

		gameSocket?.on("error", (args: ErrorType) => {
			if (args.authenticatedUser.user.username === authenticatedUser?.user.username) {
				toast({
					title: "Error | Game",
					variant: "destructive",
					description: `${args.message}`,
				});
			}
		});

		return () => {
			gameSocket.offAny();

			if (gameSocket.connected) gameSocket.disconnect();
		};
	}, [authenticatedUser, toast]);

	if (!game) return <></>;

	return (
		<GameContext.Provider
			value={{
				game,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameContextProvider;
