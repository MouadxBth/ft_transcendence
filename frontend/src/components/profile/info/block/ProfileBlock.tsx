"use client";

import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";
import { cn } from "@/lib/utils";
import { Ban } from "lucide-react";

export interface ProfileBlockProps {
	target: string;
	className?: string;
}

const ProfileBlock = ({ target, className }: ProfileBlockProps) => {
	const { notifications } = useSockets();

	const block = () => {
		notifications?.emit("block_user", target);
	};
	return (
		<Button
			onClick={() => block()}
			variant="destructive"
			className={cn("flex items-center justify-center ", className)}
		>
			<div>Block</div>
			<Ban className="h-4" />
		</Button>
	);
};

export default ProfileBlock;
