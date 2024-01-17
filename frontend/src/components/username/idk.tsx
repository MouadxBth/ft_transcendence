"use client";

import { useForm } from "react-hook-form";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
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

const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif"];

// Form Schema Validation
const formSchema = z.object({
	image: z
		.custom<FileList>((val) => val instanceof FileList, "Required")
		.refine((list) => list.length <= 1, "Only one image is allowed!")
		.refine((list) => list[0].size <= MAX_IMAGE_SIZE, `Image size should be less than 5 MB.`)
		.refine(
			(list) => ALLOWED_IMAGE_TYPES.includes(list[0].type),
			"Only these types are allowed .jpg, .jpeg, .png .gif and .webp"
		),
});

type Idk = z.infer<typeof formSchema>;

export function Idk() {
	const [preview, setPreview] = useState("");
	const form = useForm<Idk>({
		mode: "onSubmit",
		resolver: zodResolver(formSchema),
	});

	function submitCircleRegistration(value: Idk) {
		console.log({ value });
	}

	return (
		<>
			<Form {...form}>
				<form
					className="space-y-8"
					onSubmit={form.handleSubmit(submitCircleRegistration)}
				>
					<div className="w-32">
						<Avatar className="w-full h-auto">
							<AvatarImage
								className=" object-cover"
								src={preview}
							/>
							<AvatarFallback>BU</AvatarFallback>
						</Avatar>
					</div>
					<FormField
						control={form.control}
						name="image"
						render={({ field: { onChange, value, ...rest } }) => (
							<>
								<FormItem>
									<FormLabel>Circle Image</FormLabel>
									<FormControl>
										<Input
											type="file"
											{...rest}
											onChange={(event) => {
												const { files, displayUrl } = getImageData(event);
												setPreview(displayUrl);
												onChange(files);
											}}
										/>
									</FormControl>
									<FormDescription>
										Choose best image that bring spirits to your circle.
									</FormDescription>
									<FormMessage />
								</FormItem>
							</>
						)}
					/>
					<Button type="submit">Register</Button>
				</form>
			</Form>
		</>
	);
}
