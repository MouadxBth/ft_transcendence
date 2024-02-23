import { GameMatchType } from "@/lib/types/game/game-match";
import HorizontalSeparator from "@/components/ui/horizontal-separator";
import GameMatchPlayer from "./GameMatchPlayer";
import GameMatchPlayerLoading from "./GameMatchPlayerLoading";
import { Separator } from "@/components/ui/separator";
import { formattedDate } from "@/lib/utils";

export interface ProfileHistoryListItemProps {
	className?: string;
	match: GameMatchType;
}

const ProfileHistoryListItem = ({ className, match }: ProfileHistoryListItemProps) => {
	const { player1, player2 } = match;

	return (
		<>
			<div className="w-full flex space-x-2 justify-center items-center">
				{player1 ? <GameMatchPlayer player={player1} /> : <GameMatchPlayerLoading />}
				<div className="w-1/3 flex flex-col space-y-1">
					<div>{formattedDate(match.createdAt)}</div>
					<HorizontalSeparator
						text="VS"
						className="w-full"
					/>
				</div>
				{player2 ? <GameMatchPlayer player={player2} /> : <GameMatchPlayerLoading />}
			</div>
			<Separator className="my-1" />
		</>
	);
};

export default ProfileHistoryListItem;
