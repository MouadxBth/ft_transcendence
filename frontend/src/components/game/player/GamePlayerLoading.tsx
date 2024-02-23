import { Skeleton } from "@/components/ui/skeleton";

const GamePlayerLoading = () => {
	return (
		<div className="flex flex-col justify-center items-center space-y-2">
			<Skeleton className="h-32 w-32 rounded-full flex items-center justify-center">
				Waiting
			</Skeleton>
			<div className="flex flex-col items-center space-y-1">
				<Skeleton className="h-4 w-20 rounded" />
				<Skeleton className="h-4 w-32 rounded " />
				<div className="flex space-x-1">
					<Skeleton className="h-4 w-20 rounded" />
					<Skeleton className="h-4 w-20 rounded" />
				</div>
			</div>
		</div>
	);
};

export default GamePlayerLoading;
