"use client";

import { Button } from "@/components/ui/button";
import { Joystick } from "lucide-react";
import { useRouter } from "next/navigation";

export interface ConversationChallengeProps {
	name: string;
	className?: string;
}

const ConversationChallenge = ({ name, className }: ConversationChallengeProps) => {
	const { push } = useRouter();
	return (
		<Button
			className={className}
			variant="outline"
			onClick={() => {
				push(`/game?user=${name}`);
			}}
		>
			<Joystick className="mr-2 h-4 w-4" />
			<span>Challenge</span>
		</Button>
	);
};

export default ConversationChallenge;
