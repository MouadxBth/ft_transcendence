import { MatchHistoryType } from "@/lib/types/match-history";
import MatchHistoryListItem from "./MatchHistoryListItem";

export interface MatchHistoryListProps {
	data: MatchHistoryType[] | undefined;
}

const MatchHistoryList = ({ data }: MatchHistoryListProps) => {
	return (
		<div className="p-4 max-h-32 text-center">
			{!data || !data.length
				? "You haven't played any matches yet!"
				: data.map(({ nickname, firstAvatar, secondAvatar, won }) => (
						<MatchHistoryListItem
							key={nickname}
							nickname={nickname}
							firstAvatar={firstAvatar}
							secondAvatar={secondAvatar}
							won={won}
						/>
				  ))}
		</div>
	);
};

export default MatchHistoryList;
