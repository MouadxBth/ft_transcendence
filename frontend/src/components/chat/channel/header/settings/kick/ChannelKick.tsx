import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundX, Users } from "lucide-react";
import ChannelKickForm from "./ChannelKickForm";

export interface ChannelKickProps {
	name: string;
	isAdmin: boolean;
	className?: string;
}

const ChannelKick = ({ name, isAdmin, className }: ChannelKickProps) => {
	if (!isAdmin) return <></>;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className={className}
				>
					<UserRoundX className="mr-2 h-4 w-4" />
					<span>Kick</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Kick a member</DialogTitle>
				</DialogHeader>
				<ChannelKickForm name={name} />
			</DialogContent>
		</Dialog>
	);
};

export default ChannelKick;
