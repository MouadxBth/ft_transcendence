import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
	textAreaRef: HTMLTextAreaElement | null,
	value: string,
	height: number
) => {
	useEffect(() => {
		if (textAreaRef) {
			// We need to reset the height momentarily to get the correct scrollHeight for the textarea
			textAreaRef.style.height = "0px";
			const scrollHeight = textAreaRef.scrollHeight;

			// We then set the height directly, outside of the render loop
			// Trying to set this with state or a ref will product an incorrect value.
			textAreaRef.style.height = Math.max(scrollHeight, height) + "px";

			if (scrollHeight <= 320) {
				textAreaRef.style.overflowY = "hidden";
			} else {
				textAreaRef.style.overflowY = "auto";
			}
		}
	}, [textAreaRef, height, value]);
};

export default useAutosizeTextArea;
