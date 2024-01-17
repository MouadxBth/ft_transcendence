import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ChannelMessageProps {
	id: number;
	sender: string;
	avatar: string;
	message: string;
	date: Date;
}

const ChannelMessage = ({ id, sender, avatar, message, date }: ChannelMessageProps) => {
	return (
		<div className="flex flex-col border">
			<div className="flex items-center space-x-2">
				<div className="py-2 px-4 flex items-center space-x-2">
					<Avatar>
						<AvatarImage
							src={avatar}
							alt={sender}
						/>
						<AvatarFallback>{sender.substring(0, 2)}</AvatarFallback>
					</Avatar>
					<div>{sender}</div>
				</div>
				<div className="text-sm text-muted-foreground">{date.toDateString()}</div>
			</div>
			<div className="break-all whitespace-pre-wrap p-4">{message}</div>
		</div>
	);
};

export default ChannelMessage;
