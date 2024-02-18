import Link from "next/link";
import { cn, formattedDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ConversationType } from "@/lib/types/conversation/conversation";

export interface ConversationTabListItemProps {
	active: boolean;
	conversation: ConversationType;
}

const ConversationTabListItem = ({ active, conversation }: ConversationTabListItemProps) => {
	const { nickname, username, firstName, lastName, avatar } = conversation.target;
	const avatarSource = avatar.startsWith("http")
		? avatar
		: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${avatar}`;

	return (
		<>
			<Link
				href={`/chat/conversation/${username}`}
				className={cn("p-4 bg-black flex space-x-2", {
					"bg-secondary": active,
				})}
			>
				<Avatar className="h-16 w-16">
					<AvatarImage
						className="object-cover"
						src={avatarSource}
						alt={nickname}
					/>
					<AvatarFallback>{nickname.toUpperCase().slice(0, 2)}</AvatarFallback>
				</Avatar>

				<div className="flex flex-col justify-center w-full">
					<div className=" w-full flex space-x-2 items-center break-all whitespace-pre-wrap">
						<div className="">{nickname}</div>
						<div className="text-xs text-muted-foreground text-end">
							{formattedDate(conversation.createdAt)}
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<div className="text-sm">{`@${username}`}</div>
						<div className="text-xs text-muted-foreground flex items-start space-x-2 break-words whitespace-pre-wrap">
							<div>{firstName}</div>
							<div>{lastName}</div>
						</div>
					</div>
				</div>
			</Link>
			<Separator className="border" />
		</>
	);
};

export default ConversationTabListItem;
