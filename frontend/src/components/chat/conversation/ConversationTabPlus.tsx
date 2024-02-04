import UserSearch from "@/components/search/UserSearch";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useConversationContext } from "@/hooks/useConversationContext";
import { createConversation } from "@/lib/chat/chat-service-endpoints";
import { getConversationItem } from "@/lib/chat/utils";
import { toastError } from "@/lib/error-handling/toast-error";
import { Plus } from "lucide-react";
import React from "react";

const ConversationTabPlus = () => {

	const {conversationData, setConversationData} = useConversationContext();

	async function handleSubmit(value: string) {
		try {
			if (value.length == 0)
				return;
			const data = await createConversation(value);
			
			const item = await getConversationItem(value);
			conversationData.push(item);
			
			console.log("new data:", conversationData);

			setConversationData([...conversationData]);

		} catch (e) {
			toastError(e);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="p-2 rounded-full">
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Start a conversation</DialogTitle>
					<DialogDescription>
						{/* <UserSearch /> */}
						<Textarea
							className="resize-none"
							callback={handleSubmit}
						/>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ConversationTabPlus;
