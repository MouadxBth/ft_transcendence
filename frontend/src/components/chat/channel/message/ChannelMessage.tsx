import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChannelDmApiResponse, ChannelDmItem } from "@/lib/types/channel-api-response";

const ChannelMessage = ({senderId, content, createdAt: date }: ChannelDmItem) => {
	return (
		<div className="flex flex-row justify-center bg-blac rounded-xlk">
		<div className="flex flex-col border rounded-xl mx-4 my-1 w-full">
			<div className="flex items-center space-x-2">
				<div className="py-2 px-4 flex items-center space-x-2">
					<Avatar>
						<AvatarImage
							src={"none"}
							alt={senderId}
							/>
						<AvatarFallback>{senderId.substring(0, 2)}</AvatarFallback>
					</Avatar>
					<div>{senderId}</div>
				</div>
				<div className="text-sm text-muted-foreground">{new Date(date).toDateString()}</div>
			</div>
			<div className="break-all whitespace-pre-wrap p-4">{content}</div>
		</div>
							</div>
	);
};

export default ChannelMessage;
