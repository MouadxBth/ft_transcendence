import Pong from "@/components/game/Pong";
import React from "react";

const Home = () => {
	return (
		<main className="flex justify-center w-full items-center h-screen">
			<div className="border">
				<Pong />
			</div>
		</main>
	);
};

export default Home;
