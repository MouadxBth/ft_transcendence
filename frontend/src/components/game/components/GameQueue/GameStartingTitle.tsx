import { CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";

const GameStartingTitle = () => {
	return (
		<div>
			<CardTitle>
				<div className="flex flex-col items-center justify-center space-y-3">
					<div className="flex space-x-2">
						<p className="text-xl">Starting in</p>
						<Loader size={30} />
					</div>
					<h1 className="text-3xl">10</h1>
				</div>
			</CardTitle>
		</div>
	);
};

export default GameStartingTitle;
