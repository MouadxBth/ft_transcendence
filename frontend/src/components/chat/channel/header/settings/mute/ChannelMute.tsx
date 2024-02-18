import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquareOff, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import ChannelMuteForm from "./ChannelMuteForm";
import ChannelUnmuteForm from "./ChannelUnmuteFrom";

export interface ChannelMuteProps {
	name: string;
	isAdmin: boolean;
	className?: string;
}

const ChannelMuteTabs = ({ name }: { name: string }) => {
	return (
		<Tabs
			defaultValue="mute"
			className="w-full"
		>
			<TabsList className="w-full">
				<TabsTrigger
					className="basis-1/2"
					value="mute"
				>
					Mute
				</TabsTrigger>
				<TabsTrigger
					className="basis-1/2"
					value="unmute"
				>
					Unmute
				</TabsTrigger>
			</TabsList>

			<TabsContent value="mute">
				<ChannelMuteForm name={name} />
			</TabsContent>
			<TabsContent value="unmute">
				<ChannelUnmuteForm name={name} />
			</TabsContent>
		</Tabs>
	);
};

const ChannelMute = ({ name, isAdmin, className }: ChannelMuteProps) => {
	if (!isAdmin) return <></>;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className={className}
				>
					<MessageSquareOff className="mr-2 h-4 w-4" />
					<span>Mute</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full">
				<DialogHeader>
					<DialogTitle>Mute/Unmute a member</DialogTitle>
				</DialogHeader>
				<ChannelMuteTabs name={name} />
			</DialogContent>
		</Dialog>
	);
};

export default ChannelMute;
