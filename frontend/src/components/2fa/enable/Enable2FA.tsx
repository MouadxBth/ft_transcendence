"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import Image from "next/image";
import { OtpForm } from "../otp/form/OtpForm";
import { Button } from "@/components/ui/button";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { authenticatedUserSchema } from "@/lib/types/authenticated-user";
import { joinLines } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import axiosClient from "@/lib/axios";

{
	/* <p className="text-sm text-muted-foreground">
						1- Scan the QR Code with your authentication app
					</p>
					<div className="flex justify-center bg-white rounded-xl">
						<Image
							src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
							alt="qrcode"
							width={200}
							height={200}
						/>
					</div>
					<p className="text-sm text-muted-foreground">
						2- Enter the OTP from your authentication app
					</p> */
}

const parseAuthenticatedUser = (data: unknown) => {
	const result = authenticatedUserSchema.safeParse(data);

	console.log(result);

	if (!result || !result.success)
		throw new Error(`Unable to parse data into an AuthenticatedUser ${result.error.message}`);

	return result.data;
};

const Enable2FACard = () => {
	const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

	const twoFaEnableMutation = useMutation({
		mutationKey: ["2fa-enable"],
		mutationFn: async () => {
			return await axiosClient.post(`/2fa/enable`, {
				withCredentials: true,
			});
		},
		onSuccess: ({ data }) => {
			console.log("2FA ENABLED ", parseAuthenticatedUser(data));
			setAuthenticatedUser(parseAuthenticatedUser(data));
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

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className=" w-1/2 rounded-xl">
				<CardHeader className="pb-2">
					<CardTitle className="text-center">Two Factor Authentication</CardTitle>
				</CardHeader>

				<CardContent className="space-y-2 pb-2">
					{authenticatedUser?.user.twoFactorAuthenticationEnabled}
					<Button
						disabled={
							!authenticatedUser?.user.twoFactorAuthenticationEnabled ||
							twoFaEnableMutation.isPending
						}
						onClick={() => twoFaEnableMutation.mutate()}
					>
						Enable
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default Enable2FACard;
