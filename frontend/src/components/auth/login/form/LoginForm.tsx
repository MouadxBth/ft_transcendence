"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormField } from "./LoginFormField";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { LoginFormType, loginFormSchema } from "@/lib/types/login-form";
import { useMutation } from "@tanstack/react-query";
import HorizontalSeparator from "@/components/ui/horizontal-separator";
import AuthProviders from "../../AuthProviders";
import FormButton from "../../FormButton";
import axios, { AxiosError } from "axios";
import { joinLines } from "@/lib/utils";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { authenticatedUserSchema } from "@/lib/types/authenticated-user";
import axiosClient from "@/lib/axios";

const parseAuthenticatedUser = (data: unknown) => {
	const result = authenticatedUserSchema.safeParse(data);

	if (!result || !result.success)
		throw new Error(`Unable to parse data into an AuthenticatedUser ${result.error.message}`);

	return result.data;
};

const loginRequest = async (data: LoginFormType) => {
	return await axiosClient.post("/auth/local/login", data, {
		withCredentials: true,
	});
};

export const LoginForm = () => {
	const { push } = useRouter();
	const { toast } = useToast();
	const { setAuthenticatedUser } = useAuthentication();

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const login = useMutation({
		mutationKey: ["login"],
		mutationFn: loginRequest,
		onSuccess: ({ data }) => {
			console.log("HERE ", parseAuthenticatedUser(data));
			setAuthenticatedUser(parseAuthenticatedUser(data));
			push("/profile");
		},
		onError: (error: Error) => {
			const message =
				error instanceof AxiosError && error.response
					? joinLines(error.response.data.message)
					: error.message;

			console.log(error);
			toast({
				variant: "destructive",
				title: "Error!",
				description: message,
			});
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
