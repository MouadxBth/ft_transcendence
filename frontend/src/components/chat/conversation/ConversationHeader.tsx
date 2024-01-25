import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ConversationHeader = ({username}: {username: string}) => (
	<div className="flex h-20 items-center justify-center p-2 space-x-2">
		<Avatar>
			<AvatarImage
				src="https://github.com/shadcn.png"
				alt={username} />
			<AvatarFallback>{username.substring(0, 2)}</AvatarFallback>
		</Avatar>
		<div>{username}</div>
	</div>
)

export default ConversationHeader;