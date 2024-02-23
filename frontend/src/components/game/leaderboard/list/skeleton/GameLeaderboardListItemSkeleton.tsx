import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const GameLeaderboardListItemSkeleton = () => {
	return (
		<>
			<div className="flex flex-col ">
				<div className="py-2 px-1 flex items-center space-x-2">
					<Skeleton className="h-10 w-10 rounded-full" />
					<div className="flex flex-col w-full space-y-2">
						<Skeleton className="h-4 w-1/5 rounded" />

						<Skeleton className="h-8 w-1/4 rounded" />
					</div>
				</div>
			</div>
			<Separator className="border" />
		</>
	);
};

export default GameLeaderboardListItemSkeleton;
