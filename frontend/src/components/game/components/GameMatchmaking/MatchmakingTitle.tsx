import { Gamepad2Icon } from "lucide-react";

const MatchmakingTitle = () => {
	return (
		<div className="flex flex-col items-center justify-center space-y-3">
			<Gamepad2Icon size={40} />
			<h1 className="text-3xl">Game matchmaking</h1>
		</div>
	);
};

export default MatchmakingTitle;
