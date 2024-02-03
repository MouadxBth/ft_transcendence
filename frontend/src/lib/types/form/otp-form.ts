import { z } from "zod";

export const otpFormSchema = z.object({
	otp: z.string().refine((value) => /^\d{6}$/.test(value), {
		message: "OTP code must be a 6-digit numerical code.",
	}),
});

export type OtpFormType = z.infer<typeof otpFormSchema>;
