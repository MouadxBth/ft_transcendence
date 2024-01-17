import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ChannelTabListItemSkeleton = () => {
	return (
		<>
			<div className="p-4 bg-black flex space-x-2">
				<Skeleton className="h-10 w-10 rounded-full" />

				<div className="flex flex-col space-y-1 w-full">
					<div className="flex justify-between">
						<Skeleton className="h-4 w-1/2 rounded" />
						<Skeleton className="h-4 w-1/3 rounded" />
					</div>
					<Skeleton className="h-6 w-full rounded" />
				</div>
			</div>
			<Separator className="border" />
		</>
	);
};

export default ChannelTabListItemSkeleton;
