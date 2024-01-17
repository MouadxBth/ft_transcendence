"use client";

import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Loading from "@/components/ui/loading";
import OtpCard from "@/components/2fa/otp/OtpCard";
import NicknameCard from "@/components/username/NicknameCard";

export default function privatePage(Component: any) {
	return function PrivatePage(props: any) {
		const { authenticatedUser, isLoading } = useAuthentication();
		const { push } = useRouter();

		useEffect(() => {
			if (isLoading) {
				console.log("PRIVATE PAGE LOADING");
				return;
			}

			console.log("PRIVATE PAGE DONE LOADING");

			if (authenticatedUser === null) {
				console.log("PRIVATE PAGE USER NOT FOUND!");
				push("/");
			} else {
				console.log("PRIVATE PAGE USER FOUND ", authenticatedUser);
			}
		}, [isLoading, authenticatedUser, push]);

		if (isLoading || !authenticatedUser) {
			return <Loading />;
		}

		if (authenticatedUser.user.firstTime) return <NicknameCard />;

		if (authenticatedUser.user.twoFactorAuthenticationEnabled && !authenticatedUser.valid2Fa) {
			return <OtpCard />;
		}

		return <Component {...props} />;

		//return <>{authenticatedUser.user.firstTime ? <UsernameCard /> : <Component {...props} />}</>;
	};
}
