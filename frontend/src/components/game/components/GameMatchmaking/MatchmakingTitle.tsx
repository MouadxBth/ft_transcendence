import { CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2Icon } from "lucide-react";

const MatchmakingTitle = () => {
	return (
		<div className="flex flex-col items-center justify-center space-y-3">
			<CardHeader>
				<CardTitle>
					<Gamepad2Icon size={40} />
				</CardTitle>
			</CardHeader>
			<h1 className="text-3xl">Game matchmaking</h1>
		</div>
	);
};

export default MatchmakingTitle;
