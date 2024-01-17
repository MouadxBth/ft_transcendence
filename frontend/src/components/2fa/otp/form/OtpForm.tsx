"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { joinLines } from "@/lib/utils";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { authenticatedUserSchema } from "@/lib/types/authenticated-user";
import FormButton from "@/components/auth/FormButton";
import { OtpFormField } from "./OtpFormField";
import { OtpFormType, otpFormSchema } from "@/lib/types/otp-form";
import axiosClient from "@/lib/axios";

const parseAuthenticatedUser = (data: unknown) => {
	const result = authenticatedUserSchema.safeParse(data);

	console.log(result);

	if (!result || !result.success)
		throw new Error(`Unable to parse data into an AuthenticatedUser ${result.error.message}`);

	return result.data;
};

export const OtpForm = () => {
	const { toast } = useToast();
	const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

	const form = useForm<OtpFormType>({
		resolver: zodResolver(otpFormSchema),
		defaultValues: {
			otp: "",
		},
	});

	const otpMutation = useMutation({
		mutationKey: ["otp"],
		mutationFn: async (data: OtpFormType) => {
			return await axiosClient.post(
				`/auth/2fa/`,
				{
					totp: data.otp,
				},
				{
					withCredentials: true,
				}
			);
		},
		onSuccess: ({ data }) => {
			console.log("OTP UPDATED ", parseAuthenticatedUser(data));
			setAuthenticatedUser(parseAuthenticatedUser(data));
			// push("/profile");
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

	async function onSubmit(data: OtpFormType) {
		otpMutation.mutate(data);
		form.reset();
	}

	return (
		<Form {...form}>
			<form
				id="otp"
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<OtpFormField
					control={form.control}
					name="otp"
					placeholder="Enter your 2FA OTP provided by your authentication app"
					label="OTP"
					type="text"
				/>
			</form>

			<FormButton
				isPending={otpMutation.isPending}
				form="otp"
			>
				Submit
			</FormButton>
		</Form>
	);
};
