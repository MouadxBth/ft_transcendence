import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Gamepad2Icon } from "lucide-react";
import React from "react";
import GameMatchmakingForm from "./GameMatchmakingForm";

export interface GameMatchmakingProps {
	className?: string;
	defaultSelection?: string;
}

const GameMatchmaking = ({ className, defaultSelection }: GameMatchmakingProps) => {
	return (
		<Card className={className}>
			<CardHeader className="py-3 px-6">
				<CardTitle className="flex items-center space-x-2">
					<div>Matchmaking</div>
					<Gamepad2Icon />
				</CardTitle>
			</CardHeader>
			<CardContent>
				<GameMatchmakingForm
					name={""}
					defaultSelection={defaultSelection}
				/>
			</CardContent>
		</Card>
	);
};

export default GameMatchmaking;
