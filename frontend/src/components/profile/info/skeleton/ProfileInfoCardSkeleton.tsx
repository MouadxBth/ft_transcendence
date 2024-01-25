import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileInfoCardSkeleton = () => {
	return (
		<Card className="flex flex-col w-full justify-center items-center p-2">
			<div className="flex space-x-2 items-center bg-black/75 p-2 rounded-2xl">
				<Skeleton className="h-24 w-24 rounded-full" />
				<div className="flex flex-col space-y-1 items-center">
					<Skeleton className="h-4 w-24 rounded" />
					<div className="flex space-x-1">
						<Skeleton className="h-4 w-24 rounded" />
						<Skeleton className="h-4 w-24 rounded" />
					</div>
				</div>
			</div>
			<div className="flex flex-col w-full items-center space-y-2 p-2">
				<Skeleton className="h-4 w-24 rounded" />
				<Skeleton className="h-4 w-1/2 rounded" />
			</div>
		</Card>
	);
};

export default ProfileInfoCardSkeleton;
