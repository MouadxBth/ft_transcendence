"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	callback: (value: string)=>(void)
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, callback, ...props }, ref) => {
		const [value, setValue] = useState("");
		const textAreaRef = useRef<HTMLTextAreaElement>(null);

		useAutosizeTextArea(textAreaRef.current, value);

		const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
			const val = evt.target?.value;

			setValue(val);
		};

		const handleEnter = (event: any) => {
			if (event.key === "Enter" && !event.shiftKey) {
				event.preventDefault(); // Prevents new line insertion
				console.log("ENTER§");
				if (typeof callback === 'function')
					callback(value);
				setValue("");
				// event.target.value = "";
				// event.target.style.height = "36px";
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
					"flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				{...props}
			/>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
