import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export interface ChannelTabListItemProps {
	nickname: string;
	avatar: string;
	active: boolean;
	lastMessage: string;
	date: Date;
}

const ChannelTabListItem = ({
	nickname,
	active,
	avatar,
	lastMessage,
	date,
}: ChannelTabListItemProps) => {
	return (
		<>
			<Link
				href={`/chat/channel/${nickname}`}
				className={cn("p-4 bg-black flex space-x-2", {
					"bg-secondary": active,
				})}
			>
				<Avatar>
					<AvatarImage
						src={avatar}
						alt={nickname}
					/>
					<AvatarFallback>{nickname}</AvatarFallback>
				</Avatar>

				<div className="flex flex-col w-full">
					<div className=" w-full flex justify-between">
						<div className=" w-1/2">{nickname}</div>
						<div className="text-xs text-muted-foreground  text-end">{date.toDateString()}</div>
					</div>
					<div className="text-xs text-muted-foreground ">{lastMessage}</div>
				</div>
			</Link>
			<Separator className="border" />
		</>
	);
};

export default ChannelTabListItem;
