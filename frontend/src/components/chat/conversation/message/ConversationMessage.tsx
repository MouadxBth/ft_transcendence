import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formattedDate } from "@/lib/utils";
import { useEffect } from "react";

export interface ConversationMessageProps {
	id: number;
	sender: string;
	avatar: string;
	message: string;
	date: string;
	reference?: React.RefObject<HTMLDivElement>;
}

const ConversationMessage = ({
	id,
	reference,
	sender,
	avatar,
	message,
	date,
}: ConversationMessageProps) => {
	const scrollToBottom = () => {
		reference?.current?.scrollIntoView({ behavior: "smooth" });
	};

	const avatarSource = avatar.startsWith("http")
		? avatar
		: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${avatar}`;

	useEffect(() => {
		if (!reference) return;

		scrollToBottom();
	});

	return (
		<div
			className="flex flex-col border"
			ref={reference}
		>
			<div className="flex items-center space-x-2">
				<div className="py-2 px-4 flex items-center space-x-2">
					<Avatar>
						<AvatarImage
							className="object-cover"
							src={avatarSource}
							alt={sender}
						/>
						<AvatarFallback>{sender.substring(0, 2)}</AvatarFallback>
					</Avatar>
					<div>{sender}</div>
				</div>
				<div className="text-sm text-muted-foreground">{formattedDate(date)}</div>
			</div>
			<div className="break-all whitespace-pre-wrap px-4 py-2">{message}</div>
		</div>
	);
};

export default ConversationMessage;
