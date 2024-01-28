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
import { Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Plus } from "lucide-react";
import React from "react";
import CreateChannelForm from "./CreateChannelForm";
import JoinChannelForm from "./JoinChannelForm";

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
			<DialogContent className="">
				<DialogHeader>
					<DialogTitle className="text-center my-2">Create or Join a Channel</DialogTitle>
					<DialogDescription>
						{/* <UserSearch /> */}
						<Tabs>
							<TabsList className="flex justify-between w-full p-2">
								<TabsTrigger className="text-center basis-1/2" value="create"> Create </TabsTrigger>
								<TabsTrigger  className="text-center basis-1/2 p-2" value="join"> Join </TabsTrigger>
							</TabsList>
							<TabsContent className="flex flex-row justify-center" value="create">
								<CreateChannelForm />
							</TabsContent>
							<TabsContent className="flex flex-row justify-center"  value="join">
								<JoinChannelForm />
							</TabsContent>
						</Tabs>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ChannelTabPlus;
