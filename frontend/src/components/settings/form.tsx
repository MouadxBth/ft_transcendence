"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
	username: z.string(),
	firstname: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastname: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
});

function ProfileForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			firstname: "test",
			lastname: "test",
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 grid grid-cols-2 gap-2"
			>
				<FormField
					control={form.control}
					name="username"
					render={() => (
						<FormItem className="col-span-2">
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									disabled
									placeholder="player-1"
								/>
							</FormControl>
							<FormDescription className="text-xs">
								you can&apos;t change your username
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="firstname"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input
									placeholder="First Name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastname"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Last Name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}

export default ProfileForm;
