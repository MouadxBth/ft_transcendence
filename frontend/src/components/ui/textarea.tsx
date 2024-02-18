"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import useAutosizeTextArea from "@/hooks/utils/useAutosizeTextArea";
import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	callback: (value: string) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, callback, ...props }, ref) => {
		const [value, setValue] = useState("");
		const textAreaRef = useRef<HTMLTextAreaElement>(null);

		useAutosizeTextArea(textAreaRef.current, value, 48);

		const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
			setValue(event.target?.value);
		};

		const handleEnter = (event: any) => {
			if (event.key === "Enter" && !event.shiftKey) {
				event.preventDefault(); // Prevents new line insertion
				callback(value);
				setValue("");
			}
		};

		return (
			<textarea
				onKeyDown={handleEnter}
				onChange={handleChange}
				rows={1}
				ref={textAreaRef}
				value={value}
				className={cn(
					"h-12 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				{...props}
			/>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
