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
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z
	.object({
		firstname: z.string().min(2),
		nickname: z.string().min(2),
		lastname: z.string().min(2),
		password: z.string().min(2),
		confirmpassword: z.string(),
	})
	.refine((data) => data.password === data.confirmpassword, {
		message: "Passwords don't match",
		path: ["confirmpassword"],
	});

function ProfileForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
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
				className="grid grid-cols-2 gap-2 w-96 p-2 space-y-6"
			>
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
							<FormDescription className="text-xs">Please enter your first name</FormDescription>
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
							<FormDescription className="text-xs">Please enter your last name</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Password"
									{...field}
								/>
							</FormControl>
							<FormDescription className="text-xs">here you can set a new password</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmpassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Password confirmation"
									{...field}
								/>
							</FormControl>
							<FormDescription className="text-xs">confirm your new password</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
				<Button variant="outline">Cancel</Button>
			</form>
		</Form>
	);
}

export default ProfileForm;
