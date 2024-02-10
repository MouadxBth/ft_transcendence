"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import ChannelTabPlusTabs from "./ChannelTabPlusTabs";

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
				</DialogHeader>

				<ChannelTabPlusTabs />
			</DialogContent>
		</Dialog>
	);
};

export default ChannelTabPlus;
