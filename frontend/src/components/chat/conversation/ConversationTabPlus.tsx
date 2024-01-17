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
import { Plus } from "lucide-react";
import React from "react";

const ConversationTabPlus = () => {
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
						<UserSearch />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ConversationTabPlus;
