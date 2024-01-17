"use client";

import { useRef, useState } from "react";

import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";

export default function Resizeable() {
	const [value, setValue] = useState("");
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useAutosizeTextArea(textAreaRef.current, value);

	const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = evt.target?.value;

		setValue(val);
	};

	return (
		<textarea
			className="text-black"
			id="review-text"
			placeholder="What did you like or dislike?"
			onChange={handleChange}
			rows={1}
			ref={textAreaRef}
			value={value}
		/>
	);
}
