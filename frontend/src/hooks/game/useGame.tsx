import { GameContext } from "@/contexts/GameContext";
import { useContext } from "react";

const useGame = () => {
	const context = useContext(GameContext);

	if (!context) throw new Error(`useGame hook must be used inside a GameContextProvider`);

	return context;
};

export default useGame;
