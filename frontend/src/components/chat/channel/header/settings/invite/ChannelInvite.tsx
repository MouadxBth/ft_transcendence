import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundSearch, Users } from "lucide-react";
import ChannelInviteForm from "./ChannelInviteForm";

export interface ChannelInviteProps {
	name: string;
	status: string;
	isAdmin: boolean;
	className?: string;
}

const ChannelInvite = ({ name, status, isAdmin, className }: ChannelInviteProps) => {
	if (status !== "PRIVATE" || !isAdmin) return <></>;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className={className}
				>
					<UserRoundSearch className="mr-2 h-4 w-4" />
					<span>Invite</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite a user</DialogTitle>
				</DialogHeader>
				<ChannelInviteForm name={name} />
			</DialogContent>
		</Dialog>
	);
};

export default ChannelInvite;
