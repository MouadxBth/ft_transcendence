import { cn } from "@/lib/utils";
import React from "react";

export interface HorizontalSeparatorProps {
	text?: string;
	className?: string;
}

const HorizontalSeparator = ({ text, className }: HorizontalSeparatorProps) => {
	return (
		<div className={cn("flex items-center", className)}>
			<hr className="flex-grow border-t-2" />
			<span className="mx-4 text-accent">{text}</span>
			<hr className="flex-grow border-t-2 " />
		</div>
	);
};

export default HorizontalSeparator;
