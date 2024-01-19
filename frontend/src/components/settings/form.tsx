"use client";
import React, { useContext } from "react";
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
import { AuthenticationContext } from "@/contexts/AuthenticationContext";

const formSchema = z
	.object({
		username: z.string(),
		firstname: z
			.string()
			.min(2, {
				message: "First name must be at least 2 characters.",
			})
			.optional(),
		nickname: z
			.string()
			.min(2, {
				message: "Nickname must be at least 2 characters.",
			})
			.optional(),
		lastname: z
			.string()
			.min(2, {
				message: "First name must be at least 2 characters.",
			})
			.optional(),
		password: z
			.string()
			.min(8, {
				message: "Password must be at least 8 characters.",
			})
			.optional(),
		confirmpassword: z.string(),
	})
	.refine((data) => data.password !== data.confirmpassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

function ProfileForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			nickname: "current nickname",
			firstname: "current first name",
			lastname: "current last name",
			password: "123456789",
			confirmpassword: "123456789",
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-2 w-96 space-y-4 p-2"
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
									placeholder="username"
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
					name="nickname"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Nickname</FormLabel>
							<FormControl>
								<Input
									placeholder="nickname"
									{...field}
								/>
							</FormControl>
							<FormDescription className="text-xs">this is you public display name</FormDescription>
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
				{/* <Button type="submit">Submit</Button> */}
			</form>
		</Form>
	);
}

export default ProfileForm;
