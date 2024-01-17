"use client";

import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const FileUpload = () => {
	// Images
	const MAX_IMAGE_SIZE = 5242880; // 5 MB
	const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif"];

	// Form Schema Validation
	const formSchema = z.object({
		images: z
			.custom<File>((val) => val instanceof File, "Required")
			.refine((file) => file.size <= MAX_IMAGE_SIZE, `Image size should be less than 5 MB.`)
			.refine(
				(file) => ALLOWED_IMAGE_TYPES.includes(file.type),
				"Only these types are allowed .jpg, .jpeg, .png .gif and .webp"
			),
	});

	// Form Hook
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	// Form Submit Handler (After validated with zod)
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// Log values
		console.log(values);
	};

	return (
		<section className="flex flex-col gap-5 xl:gap-6">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4 xl:gap-5"
				>
					{/* Images */}
					<FormField
						control={form.control}
						name="images"
						render={({ field: { onChange }, ...field }) => {
							// Get current images value (always watched updated)
							const image = form.watch("images");

							return (
								<FormItem>
									<FormLabel>Images</FormLabel>
									{/* File Upload */}
									<FormControl>
										<Input
											type="file"
											accept="image/*"
											multiple={true}
											disabled={form.formState.isSubmitting}
											{...field}
											onChange={(event) => {
												// Triggered when user uploaded a new file
												// FileList is immutable, so we need to create a new one
												const dataTransfer = new DataTransfer();

												// Add old images
												if (image) {
													dataTransfer.items.add(image);
												}

												// Add newly uploaded images
												Array.from(event.target.files!).forEach((image) =>
													dataTransfer.items.add(image)
												);

												// Validate and update uploaded file
												const newFiles = dataTransfer.files;
												onChange(newFiles);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<div className="flex flex-col gap-5 sm:flex-row">
						{/* Cancel Button */}
						<Link
							href="/dashboard/my-events"
							className={`w-full ${
								form.formState.isSubmitting ? "pointer-events-none" : "pointer-events-auto"
							}`}
						>
							<Button
								variant="secondary"
								type="button"
								className="flex w-full flex-row items-center gap-2"
								size="lg"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
								Cancel
							</Button>
						</Link>

						{/* Submit Button */}
						<Button
							variant="default"
							className="flex w-full flex-row items-center gap-2"
							size="lg"
							type="submit"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
							Create Event
						</Button>
					</div>
				</form>
			</Form>
		</section>
	);
};

export default FileUpload;
