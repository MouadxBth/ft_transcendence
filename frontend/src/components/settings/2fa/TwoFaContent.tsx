"use client";

import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { cn } from "@/lib/utils";
import Enable2FA from "./Enable2FA";
import Disable2FA from "./Disable2FA";

const TwoFaContent = ({ className }: { className?: string }) => {
	const { authenticatedUser } = useAuthentication();

	const twoFaEnabled = authenticatedUser?.user.twoFactorAuthenticationEnabled;

	return (
		<div className={cn("w-full h-full flex justify-center items-center p-12", className)}>
			{twoFaEnabled ? <Disable2FA /> : <Enable2FA />}
		</div>
	);
};

export default TwoFaContent;
