"use client";

import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { cn } from "@/lib/utils";
import Disable from "./Disable2FAComponent";
import Enable from "./Enable2FAComponent";

const TwoFaContent = ({ className }: { className?: string }) => {
	const { authenticatedUser } = useAuthentication();

	const twoFaEnabled = authenticatedUser?.user.twoFactorAuthenticationEnabled;

	return (
		<div className={cn(className)}>
			<div className="w-full h-full flex justify-center items-center">
				{twoFaEnabled ? <Disable /> : <Enable />}
			</div>
		</div>
	);
};

export default TwoFaContent;
