"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import ConversationStartForm from "./start/ConversationStartForm";

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
				</DialogHeader>

				<ConversationStartForm />
			</DialogContent>
		</Dialog>
	);
};

export default ConversationTabPlus;
