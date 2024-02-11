"use client";

import React from "react";
import OtpCardFirstTime from "./content/OtpCardFirstTime";
import OtpCardContent from "./content/OtpCardContent";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";

const OtpCard = () => {
	const { authenticatedUser } = useAuthentication();

	if (!authenticatedUser) return null;

	const firstTime =
		authenticatedUser.user.twoFactorAuthenticationEnabled &&
		authenticatedUser.user.twoFactorAuthenticationFirstTime;

	return (
		<div className="flex items-center justify-center min-h-screen">
			{firstTime ? <OtpCardFirstTime /> : <OtpCardContent />}
		</div>
	);
};

export default OtpCard;
