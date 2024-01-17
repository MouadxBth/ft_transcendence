"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";

const Disable2FACard = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className=" w-1/2 rounded-xl">
				<CardHeader className="pb-2">
					<CardTitle className="text-center">Two Factor Authentication</CardTitle>
					<CardDescription className="text-center">
						The 2FA OTP from your authentication app
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-2 pb-2">{/* <OtpForm /> */}</CardContent>
			</Card>
		</div>
	);
};

export default Disable2FACard;
