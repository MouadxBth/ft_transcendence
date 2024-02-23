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

export const backgroundStyles = (banner: string | null) =>
	banner
		? {
				backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/banner/${banner})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}
		: {};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formattedDate = (input: string) => {
	const inputDate = new Date(input);
	return `${months[inputDate.getMonth()]} ${inputDate.getDate()} ${inputDate.getFullYear()} ${inputDate
		.getHours()
		.toString()
		.padStart(2, "0")}:${inputDate.getMinutes().toString().padStart(2, "0")}`;
};

export const getOnlineStatusVariant = (status: string) => {
	if (status === "Offline") return "destructive";
	if (status === "Online") return "default";
	if (status === "In-game") return "outline";
	return "secondary";
};

export const getStatusColor = (status: string) => {
	if (status === "PUBLIC") return "text-green-500";
	else if (status === "PROTECTED") return "text-amber-500";
	else return "text-blue-500";
};

export const getRankColor = (rank: number) => {
	const colors = [
		"text-amber-500",
		"text-green-500",
		"text-blue-500",
		"", // default color
	];

	return colors[rank < colors.length ? rank : colors.length - 1];
};
