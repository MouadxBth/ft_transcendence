import { CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2Icon } from "lucide-react";

const MatchmakingTitle = () => {
	return (
		<div>
			<CardHeader className="flex flex-col items-center justify-center space-y-3">
				<Gamepad2Icon size={40} />
				<CardTitle className="text-3xl">Game matchmaking</CardTitle>
			</CardHeader>
		</div>
	);
};

export default MatchmakingTitle;
