"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Users } from "lucide-react";
import ChannelMemberList from "./members/member/ChannelMemberList";
import { ChannelType } from "@/lib/types/channel/channel";

export interface ChannelMembersProps {
	channel: ChannelType;
	className?: string;
}

const ChannelMembers = ({ channel, className }: ChannelMembersProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className={className}
				>
					<Users className="mr-2 h-4 w-4" />
					<span>Members</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Channel Members</DialogTitle>
					<DialogDescription>
						<ChannelMemberList name={channel.name} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ChannelMembers;
