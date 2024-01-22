import { type ClassValue, clsx } from "clsx";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

const options = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
} as Intl.DateTimeFormatOptions;

export const dateFormat = new Intl.DateTimeFormat("en-US", options);

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function joinLines(lines: string[] | string): string {
	if (typeof lines === "string") return lines;

	if (lines.length === 0) {
		return "";
	}

	const joinedLines = lines.slice(0, -1).join(", ");
	const lastLine = lines[lines.length - 1];

	return lines.length > 1 ? `${joinedLines}, ${lastLine}` : lastLine;
}

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
	// FileList is immutable, so we need to create a new one
	const dataTransfer = new DataTransfer();

	// Add newly uploaded images
	Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

	const files = dataTransfer.files;
	if (!event.target.files || event.target.files.length <= 0) {
		return {
			files,
			displayUrl: "",
		};
	}

	const displayUrl = URL.createObjectURL(event.target.files![0]);

	return { files, displayUrl };
}
