import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

const GameMatchmakingButtons = () => {
	return (
		<div>
			<CardFooter className="flex space-x-2 items-center justify-center">
				<Button variant="outline">cancel</Button>
				<Button>Matchmaking</Button>
			</CardFooter>
		</div>
	);
};

export default GameMatchmakingButtons;
