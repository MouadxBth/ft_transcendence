import { Button } from "@/components/ui/button";
import { Joystick } from "lucide-react";
import { useRouter } from "next/navigation";

export interface ChannelMemberChallengeProps {
	name: string;
	className?: string;
}

const ChannelMemberChallenge = ({ name, className }: ChannelMemberChallengeProps) => {
	const { push } = useRouter();
	return (
		<Button
			className={className}
			onClick={() => {
				push(`/game?user=${name}`);
			}}
		>
			<Joystick className="mr-2 h-4 w-4" />
			<span>Challenge</span>
		</Button>
	);
};

export default ChannelMemberChallenge;
