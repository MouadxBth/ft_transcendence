"use client";

import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";
import { Joystick } from "lucide-react";

export interface ConversationChallengeProps {
	name: string;
	className?: string;
}

const ConversationChallenge = ({ name, className }: ConversationChallengeProps) => {
	const { conversations } = useSockets();

	return (
		<Button
			className={className}
			variant="outline"
			onClick={() => {
				// conversations?.emit("delete_conversation", name);
			}}
		>
			<Joystick className="mr-2 h-4 w-4" />
			<span>Challenge</span>
		</Button>
	);
};

export default ConversationChallenge;
