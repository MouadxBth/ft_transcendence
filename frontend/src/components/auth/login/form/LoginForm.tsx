"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormField } from "./LoginFormField";
import { Form } from "@/components/ui/form";
import HorizontalSeparator from "@/components/ui/horizontal-separator";
import AuthProviders from "../../AuthProviders";
import FormButton from "../../FormButton";
import useLogin from "@/hooks/authentication/useLogin";
import { LoginFormType, loginFormSchema } from "@/lib/types/form/login-form";

export const LoginForm = () => {
	const login = useLogin();

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function onSubmit(data: LoginFormType) {
		login.mutate(data);
	}

	return (
		<Form {...form}>
			<form
				id="login"
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<LoginFormField
					control={form.control}
					name="username"
					placeholder="Enter a good unique username."
					label="Username"
					type="text"
				/>

				<LoginFormField
					control={form.control}
					name="password"
					placeholder="Enter a strong password."
					label="Password"
					type="password"
				/>
			</form>
			<HorizontalSeparator text="Or" />

			<AuthProviders
				width={20}
				height={20}
			/>
			<FormButton
				isPending={login.isPending}
				form="login"
			>
				Login
			</FormButton>
		</Form>
	);
};
