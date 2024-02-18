import { CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";

export interface GameWaitingTitleProps {
	opponent: string;
	data: any;
}

const GameWaitingTitle = ({ opponent, data }: GameWaitingTitleProps) => {
	return (
		<>
			<CardTitle>
				<div className="flex flex-col items-center justify-center space-y-5">
					{opponent ? (
						<h1 className="text-center">
							Waiting for <span className="text-amber-500">{data?.nickname}</span> to accept...
						</h1>
					) : (
						<h1>Waiting for a player to join</h1>
					)}
					<Loader
						className="animate-spin"
						size={40}
					/>
				</div>
			</CardTitle>
		</>
	);
};

export default GameWaitingTitle;
