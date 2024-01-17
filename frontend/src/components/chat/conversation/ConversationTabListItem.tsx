import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { cn } from "@/lib/utils";

export interface ConversationTabListItemProps {
	nickname: string;
	avatar: string;
	lastMessage: string;
	date: Date;
	active: boolean;
}

const ConversationTabListItem = ({
	nickname,
	avatar,
	active,
	lastMessage,
	date,
}: ConversationTabListItemProps) => {
	return (
		<>
			<Link
				href={`/chat/conversation/${nickname}`}
				className={cn("p-4 bg-black flex space-x-2", {
					" bg-secondary": active,
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

export default ConversationTabListItem;
