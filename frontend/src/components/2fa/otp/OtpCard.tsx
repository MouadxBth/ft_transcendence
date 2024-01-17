"use client";

import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import { OtpForm } from "./form/OtpForm";
import useQrCode from "@/hooks/useQrCode";
import Loading from "@/components/ui/loading";
import { useAuthentication } from "@/contexts/AuthenticationContext";

const FirstCard = () => {
	return (
		<Card className=" w-1/2 rounded-xl">
			<CardHeader className="pb-2">
				<CardTitle className="text-center">Enter your 2FA OTP:</CardTitle>
				<CardDescription className="text-center">
					The 2FA OTP from your authentication app
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-2 pb-2">
				<OtpForm />
			</CardContent>
		</Card>
	);
};

const QrCode = () => {
	const { data, isLoading, isError } = useQrCode();

	if (isLoading) return <Loading />;

	if (isError) return <div>Error!</div>;

	return (
		<Image
			className="bg-white"
			src={data!}
			alt="qrcode"
			width={200}
			height={200}
		/>
	);
};

const SecondCard = () => {
	return (
		<Card className=" w-1/2 rounded-xl">
			<CardHeader className="pb-2">
				<CardTitle className="text-center">Activate 2FA:</CardTitle>
				<CardDescription className="text-center">
					The 2FA OTP from your authentication app
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-2 pb-2">
				<p className="text-sm text-muted-foreground">
					1- Scan the QR Code with your authentication app
				</p>
				<div className="flex justify-center  rounded-xl">
					<QrCode />
				</div>
				<p className="text-sm text-muted-foreground">
					2- Enter the OTP from your authentication app
				</p>
				<OtpForm />
			</CardContent>
		</Card>
	);
};

const OtpCard = () => {
	const { authenticatedUser } = useAuthentication();

	return (
		<div className="flex items-center justify-center min-h-screen">
			{authenticatedUser?.user.twoFactorAuthenticationEnabled &&
			authenticatedUser?.user.twoFactorAuthenticationFirstTime ? (
				<SecondCard />
			) : (
				<FirstCard />
			)}
		</div>
	);
};

export default OtpCard;
