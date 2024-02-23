import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ChannelType } from "@/lib/types/channel/channel";
import { SlidersHorizontal, UserRoundX, Users } from "lucide-react";
import ChannelUpdateTabs from "./ChannelUpdateTabs";

export interface ChannelUpdateProps {
	channel: ChannelType;
	isOwner: boolean;
	className?: string;
}

const ChannelUpdate = ({ channel, isOwner, className }: ChannelUpdateProps) => {
	if (!isOwner) return <></>;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className={className}
				>
					<SlidersHorizontal className="mr-2 h-4 w-4" />
					<span>Update</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update the channel</DialogTitle>
				</DialogHeader>
				<ChannelUpdateTabs channel={channel} />
			</DialogContent>
		</Dialog>
	);
};

export default ChannelUpdate;
