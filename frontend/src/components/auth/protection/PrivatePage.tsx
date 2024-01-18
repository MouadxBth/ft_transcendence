"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Loading from "@/components/ui/loading";
import NicknameCard from "@/components/nickname/NicknameCard";
import OtpCard from "../2fa/otp/OtpCard";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";

export default function privatePage(Component: any) {
	return function PrivatePage(props: any) {
		const { authenticatedUser, isLoading } = useAuthentication();
		const { push } = useRouter();

		useEffect(() => {
			if (isLoading) {
				return;
			}

			if (authenticatedUser === null) push("/");
		}, [isLoading, authenticatedUser, push]);

		if (isLoading || !authenticatedUser) {
			return (
				<div className="w-full h-full flex items-center justify-center">
					<Loading />
				</div>
			);
		}

		if (authenticatedUser.user.firstTime) return <NicknameCard />;

		if (authenticatedUser.user.twoFactorAuthenticationEnabled && !authenticatedUser.valid2Fa) {
			return <OtpCard />;
		}

		return <Component {...props} />;
	};
}
