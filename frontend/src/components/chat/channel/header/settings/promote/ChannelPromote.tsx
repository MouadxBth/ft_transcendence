import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { SquareUserRound, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import ChannelPromoteForm from "./ChannelPromoteForm";
import ChannelDemoteForm from "./ChannelDemoteFrom";

export interface ChannelPromoteProps {
	name: string;
	isOwner: boolean;
	className?: string;
}

const ChannelPromoteTabs = ({ name }: { name: string }) => {
	return (
		<Tabs
			defaultValue="promote"
			className="w-full"
		>
			<TabsList className="w-full">
				<TabsTrigger
					className="basis-1/2"
					value="promote"
				>
					Promote
				</TabsTrigger>
				<TabsTrigger
					className="basis-1/2"
					value="demote"
				>
					Demote
				</TabsTrigger>
			</TabsList>

			<TabsContent value="promote">
				<ChannelPromoteForm name={name} />
			</TabsContent>
			<TabsContent value="demote">
				<ChannelDemoteForm name={name} />
			</TabsContent>
		</Tabs>
	);
};

const ChannelPromote = ({ name, isOwner, className }: ChannelPromoteProps) => {
	if (!isOwner) return <></>;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className={className}
				>
					<SquareUserRound className="mr-2 h-4 w-4" />
					<span>Promote</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full">
				<DialogHeader>
					<DialogTitle>Promote/Demote a member</DialogTitle>
				</DialogHeader>
				<ChannelPromoteTabs name={name} />
			</DialogContent>
		</Dialog>
	);
};

export default ChannelPromote;
