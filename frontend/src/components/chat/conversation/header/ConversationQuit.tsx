"use client";

import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";
import { Trash2 } from "lucide-react";

export interface ConversationQuitProps {
	name: string;
	className?: string;
}

const ConversationQuit = ({ name, className }: ConversationQuitProps) => {
	const { conversations } = useSockets();

	return (
		<Button
			className={className}
			variant="outline"
			onClick={() => {
				conversations?.emit("delete_conversation", name);
			}}
		>
			<Trash2 className="mr-2 h-4 w-4" />
			<span>Delete</span>
		</Button>
	);
};

export default ConversationQuit;
