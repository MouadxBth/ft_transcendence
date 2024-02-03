import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ChannelItem } from "@/hooks/useChannelContext";

export interface ChannelTabListItemProps extends ChannelItem {
	active: boolean;
	lastMessage: string;
}

const ChannelTabListItem = ({
	active,
	lastMessage,
	createdAt,
	name
}: ChannelTabListItemProps) => {
	return (
		<>
			<Link
				href={`/chat/channel/${name}`}
				className={cn("p-4 flex space-x-2", {
					"bg-secondary": active,
				})}
			>
				<Avatar>
					<AvatarImage
						alt={name}
					/>
					<AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
				</Avatar>

				<div className="flex flex-col w-full">
					<div className=" w-full flex justify-between">
						<div className=" w-1/2">{name}</div>
						<div className="text-xs text-muted-foreground  text-end">{new Date(createdAt).toDateString()}</div>
					</div>
					<div className="text-xs text-muted-foreground ">{lastMessage}</div>
				</div>
			</Link>
			<div className="h-full flex justify-center">
				<Separator className="border w-[90%]" />
			</div>
		</>
	);
};

export default ChannelTabListItem;
