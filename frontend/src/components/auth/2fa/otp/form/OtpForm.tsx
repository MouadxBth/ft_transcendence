"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormButton from "@/components/auth/FormButton";
import { OtpFormField } from "./OtpFormField";
import useOtp from "@/hooks/authentication/useOtp";
import { OtpFormType, otpFormSchema } from "@/lib/types/form/otp-form";

export const OtpForm = () => {
	const form = useForm<OtpFormType>({
		resolver: zodResolver(otpFormSchema),
		defaultValues: {
			otp: "",
		},
	});

	const otp = useOtp();

	async function onSubmit(data: OtpFormType) {
		otp.mutate(data);
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
				isPending={otp.isPending}
				form="otp"
			>
				Submit
			</FormButton>
		</Form>
	);
};
