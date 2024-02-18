import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-dropdown-menu";

const ChannelMessageSkeleton = () => {
	return (
		<div className="flex flex-col ">
			<div className="py-2 px-4 flex items-center space-x-2">
				<Skeleton className="h-10 w-10 rounded-full" />
				<div className="flex flex-col w-full space-y-2">
					<div className="flex space-x-2">
						<Skeleton className="h-4 w-1/5 rounded" />
						<Skeleton className="h-4 w-1/5 rounded" />
					</div>

					<Skeleton className="h-10 w-full rounded" />
				</div>
			</div>

			<Separator className="border" />
		</div>
	);
};

export default ChannelMessageSkeleton;
