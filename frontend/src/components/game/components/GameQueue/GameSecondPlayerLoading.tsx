import { Skeleton } from "@/components/ui/skeleton";

const GameSecondPlayerLoading = () => {

	return (
		<div className="flex flex-col justify-center items-center space-y-3 w-full h-full">
			<Skeleton className="h-32 w-32 rounded-full flex items-center justify-center">
				Waiting
			</Skeleton>
			<Skeleton className="h-6 w-20 rounded-full flex items-center justify-center"></Skeleton>
		</div>
	)
}

export default GameSecondPlayerLoading;
