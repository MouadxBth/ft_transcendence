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
import { createConversation } from "@/lib/chat/chat-service-endpoints";
import { toastError } from "@/lib/error-handling/toast-error";
import { Plus } from "lucide-react";
import React from "react";

const ConversationTabPlus = () => {

	async function handleSubmit(value: string) {
		try {
			if (value.length == 0)
				return;
			const data = await createConversation(value);
			console.log("created:", data);
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
							callback={handleSubmit}
						/>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ConversationTabPlus;
