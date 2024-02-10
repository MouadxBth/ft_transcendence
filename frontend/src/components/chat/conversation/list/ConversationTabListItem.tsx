import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export interface ConversationTabListItemProps {
	nickname: string;
	avatar: string;
	active: boolean;
	lastMessage: string;
	date: Date;
}

const ConversationTabListItem = ({
	nickname,
	active,
	avatar,
	lastMessage,
	date,
}: ConversationTabListItemProps) => {
	return (
		<>
			<Link
				href={`/chat/conversation/${nickname}`}
				className={cn("p-4 bg-black flex space-x-2", {
					"bg-secondary": active,
				})}
			>
				<Avatar>
					<AvatarImage
						src={avatar}
						alt={nickname}
					/>
					<AvatarFallback>{nickname.substring(0, 2)}</AvatarFallback>
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

export default ConversationTabListItem;
