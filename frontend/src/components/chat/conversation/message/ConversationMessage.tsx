import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ConversationMessageProps } from "@/app/(sockets)/(authenticated)/chat/conversation/[id]/page";


export const ConversationMessage = ({ id, sender, avatar, message, date }: ConversationMessageProps) => {
	return (
		<div className="flex flex-col border">
			<div className="flex items-center space-x-2">
				<div className="py-2 px-4 flex items-center space-x-2">
					<Avatar>
						<AvatarImage
							src={avatar}
							alt={sender}
						/>
						<AvatarFallback>{sender.substring(0,2)}</AvatarFallback>
					</Avatar>
					<div>{sender}</div>
				</div>
				<div className="text-sm text-muted-foreground">{date.toDateString()}</div>
			</div>
			<div className="break-all whitespace-pre-wrap p-4">{message}</div>
		</div>
	);
};
