import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formattedDate } from "@/lib/utils";

export interface ChannelMessageProps {
	id: number;
	sender: string;
	avatar: string;
	message: string;
	date: string;
}

const ChannelMessage = ({ id, sender, avatar, message, date }: ChannelMessageProps) => {
	return (
		<div className="flex flex-col border">
			<div className="flex items-center space-x-2">
				<div className="py-2 px-4 flex items-center space-x-2">
					<Avatar>
						<AvatarImage
							className="object-cover"
							src={
								avatar.startsWith("http")
									? avatar
									: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${avatar}`
							}
							alt={sender}
						/>
						<AvatarFallback>{sender.substring(0, 2)}</AvatarFallback>
					</Avatar>
					<div>{sender}</div>
				</div>
				<div className="text-sm text-muted-foreground">{formattedDate(date)}</div>
			</div>
			<div className="break-all whitespace-pre-wrap p-4">{message}</div>
		</div>
	);
};

export default ChannelMessage;
