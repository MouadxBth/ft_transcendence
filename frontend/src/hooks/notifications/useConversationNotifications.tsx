import { useEffect } from "react";
import useSockets from "../socket/useSockets";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { formattedDate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { ConversationType } from "@/lib/types/conversation/conversation";
import { useToast } from "@/components/ui/use-toast";

const ConversationData = ({
	name,
	createdAt,
	message,
}: {
	name: string;
	createdAt: string;
	message: string;
}) => {
	return (
		<div className="flex flex-col">
			<div className="text-xs">{formattedDate(createdAt)}</div>
			<div className="pt-2 pb-1">{name}</div>
			<div className="text-xs">{message}</div>
		</div>
	);
};

const useConversationNotifications = () => {
	const { authenticatedUser } = useAuthentication();
	const { conversations } = useSockets();
	const { toast } = useToast();
	const queryClient = useQueryClient();

	useEffect(() => {
		conversations?.on("conversation_created", (args: ConversationType) => {
			toast({
				title: "Conversations",
				className: "rounded",
				description: (
					<ConversationData
						name={args.target.nickname}
						createdAt={args.createdAt}
						message="Conversation successfully created!"
					/>
				),
			});
		});

		conversations?.on("conversation_added", (args: ConversationType) => {
			toast({
				title: "Conversations",
				className: "rounded",
				description: (
					<ConversationData
						name={args.target.nickname}
						createdAt={args.createdAt}
						message={`${args.target.nickname} has created a conversation with you!`}
					/>
				),
			});
		});

		conversations?.on("conversation_deleted", (args: ConversationType) => {
			toast({
				title: "Conversations",
				className: "rounded",
				description: (
					<ConversationData
						name={args.target.nickname}
						createdAt={args.createdAt}
						message="Conversation successfully deleted!"
					/>
				),
			});
		});

		conversations?.on("conversation_removed", (args: ConversationType) => {
			toast({
				title: "Conversations",
				className: "rounded",
				description: (
					<ConversationData
						name={args.target.nickname}
						createdAt={args.createdAt}
						message={`${args.target.nickname} has deleted his conversation with you!`}
					/>
				),
			});
		});
	}, [conversations, queryClient, authenticatedUser, toast]);
};

export default useConversationNotifications;
