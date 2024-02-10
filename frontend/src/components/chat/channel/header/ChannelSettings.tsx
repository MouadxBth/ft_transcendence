import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import useSockets from "@/hooks/socket/useSockets";
import { DoorOpen, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export interface ChannelQuitProps {
	name: string;
}

const ChannelQuit = ({ name }: ChannelQuitProps) => {
	const { channels } = useSockets();
	const { push } = useRouter();

	return (
		<Button
			variant="outline"
			onClick={() => {
				channels?.emit("leave_channel", name);
				push("/chat");
			}}
		>
			<DoorOpen className="mr-2 h-4 w-4" />
			<span>Exit</span>
		</Button>
	);
};

const ChannelMembers = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Users className="mr-2 h-4 w-4" />
					<span>Members</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Channel Members</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export interface ChannelSettingsProps {
	name: string;
}

const ChannelSettings = ({ name }: ChannelSettingsProps) => {
	return (
		<div className=" space-x-2">
			<ChannelMembers />
			<ChannelQuit name={name} />
		</div>
	);
};

export default ChannelSettings;
