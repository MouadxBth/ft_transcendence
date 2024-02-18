import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { UserX, Users } from "lucide-react";
import ChannelBanForm from "./ChannelBanForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import ChannelUnbanForm from "./ChannelUnbanFrom";

export interface ChannelBanProps {
	name: string;
	isAdmin: boolean;
	className?: string;
}

const ChannelBanTabs = ({ name }: { name: string }) => {
	return (
		<Tabs
			defaultValue="ban"
			className="w-full"
		>
			<TabsList className="w-full">
				<TabsTrigger
					className="basis-1/2"
					value="ban"
				>
					Ban
				</TabsTrigger>
				<TabsTrigger
					className="basis-1/2"
					value="unban"
				>
					Unban
				</TabsTrigger>
			</TabsList>

			<TabsContent value="ban">
				<ChannelBanForm name={name} />
			</TabsContent>
			<TabsContent value="unban">
				<ChannelUnbanForm name={name} />
			</TabsContent>
		</Tabs>
	);
};

const ChannelBan = ({ name, isAdmin, className }: ChannelBanProps) => {
	if (!isAdmin) return <></>;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className={className}
				>
					<UserX className="mr-2 h-4 w-4" />
					<span>Ban</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full">
				<DialogHeader>
					<DialogTitle>Ban/Unban a member</DialogTitle>
				</DialogHeader>
				<ChannelBanTabs name={name} />
			</DialogContent>
		</Dialog>
	);
};

export default ChannelBan;
