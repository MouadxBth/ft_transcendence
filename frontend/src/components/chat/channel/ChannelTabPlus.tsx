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
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import React from "react";

const ChannelTabPlus = () => {

	const handleSubmit = (val: string) => {
		
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="p-2 rounded-full">
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center my-2">Create or Join a Channel</DialogTitle>
					<DialogDescription>
						{/* <UserSearch /> */}
						<Textarea
						callback={handleSubmit}
						className=""
						/>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ChannelTabPlus;
