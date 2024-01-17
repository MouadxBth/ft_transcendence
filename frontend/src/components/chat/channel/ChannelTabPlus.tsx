import UserSearch from "@/components/search/UserSearch";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";

const ChannelTabPlus = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="p-2 rounded-full">
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create or Join a Channel</DialogTitle>
					<DialogDescription>
						<UserSearch />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ChannelTabPlus;
