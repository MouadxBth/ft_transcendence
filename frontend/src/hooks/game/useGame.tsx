import { Sonner } from "@/components/ui/sonner";
import useSockets from "../socket/useSockets"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";

const useGame = () => {
	const { game } = useSockets();

	function gameRequestHandler() {
		console.log("Received a game request!");
	}

	game?.on("game_request", gameRequestHandler)
}

export default useGame;