"use client";

import GameContextProvider from "@/providers/GameContextProvider";

const GameLayout = ({ children }: { children: React.ReactNode }) => {
	return <GameContextProvider>{children}</GameContextProvider>;
};

export default GameLayout;
