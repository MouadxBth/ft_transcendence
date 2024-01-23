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
import { useAuthentication } from "@/hooks/authentication/useAuthentication";

const formSchema = z
	.object({
		firstname: z.string().refine((value) => value === "" || value.length >= 2, {
			message: "String must contain at least 2 character(s)",
		}),
		nickname: z.string().refine((value) => value === "" || value.length >= 2, {
			message: "String must contain at least 2 character(s)",
		}),
		lastname: z.string().refine((value) => value === "" || value.length >= 2, {
			message: "String must contain at least 2 character(s)",
		}),
		password: z.string(),
		confirmpassword: z.string(),
	})
	.refine((data) => data.password === data.confirmpassword, {
		message: "Passwords don't match",
		path: ["confirmpassword"],
	});

function ProfileForm() {
	const { authenticatedUser } = useAuthentication();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nickname: "",
			firstname: "",
			lastname: "",
			password: "",
			confirmpassword: "",
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-2 p-2 space-y-6 w-full"
			>
				<FormField
					control={form.control}
					name="nickname"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Nickname</FormLabel>
							<FormControl>
								<Input
									placeholder={authenticatedUser?.user?.nickname || ""}
									{...{
										...field,
										value: field.value ?? "",
									}}
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
									placeholder={authenticatedUser?.user?.firstName || ""}
									{...{
										...field,
										value: field.value ?? "",
									}}
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
									placeholder={authenticatedUser?.user?.lastName || ""}
									{...{
										...field,
										value: field.value ?? "",
									}}
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
									{...{
										...field,
										value: field.value ?? "",
									}}
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
									{...{
										...field,
										value: field.value ?? "",
									}}
								/>
							</FormControl>
							<FormDescription className="text-xs">confirm your new password</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button variant="outline">Cancel</Button>
				<Button type="submit">Update profile</Button>
			</form>
		</Form>
	);
}

export default ProfileForm;
