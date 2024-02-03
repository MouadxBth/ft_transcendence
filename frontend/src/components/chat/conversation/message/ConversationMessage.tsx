import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ConversationMessageProps } from "@/app/(sockets)/(authenticated)/chat/conversation/[id]/page";


export const ConversationMessage = ({ id, sender, avatar, message, date }: ConversationMessageProps) => {
	return (
		<div className="flex flex-row justify-center bg-blac rounded-xl bg-black">

		<div className="flex flex-col border rounded-xl mx-4 my-1 w-full">
			<div className="flex items-center space-x-2">
				<div className="py-2 px-4 flex items-center space-x-2">
					<Avatar className="h-full">
						<AvatarImage className="rounded-full"
							src={avatar}
							alt={sender}
							height={"40px"}
							width={"40px"}
						/>
						<AvatarFallback>{sender.substring(0,2)}</AvatarFallback>
					</Avatar>
					<div>{sender}</div>
				</div>
				<div className="text-sm text-muted-foreground">{date.toDateString()}</div>
			</div>
			<div className="break-all whitespace-pre-wrap p-4">{message}</div>
		</div>
		</div>

	);
};
