import { cn, getRankColor } from "@/lib/utils";
import { Badge } from "./badge";

export interface RankProps {
	rank: number;
	className?: string;
}

const Rank = ({ rank, className }: RankProps) => {
	const colorClass = getRankColor(rank);

	return (
		<Badge
			className={cn(`absolute top-10 left-0 ${colorClass}`, className)}
			variant="outline"
		>
			#Rank {rank + 1}
		</Badge>
	);
};

export default Rank;
