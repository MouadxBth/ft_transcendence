"use client";

import Loading from "@/components/ui/loading";
import useQrCode from "@/hooks/authentication/useQrCode";
import Image from "next/image";
import QrCodeError from "./QrCodeError";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";

const QrCode = () => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading, isError, error } = useQrCode(authenticatedUser?.user.username!);

	if (isLoading) return <Loading className="h-12" />;

	if (isError) return <QrCodeError error={error} />;

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

export default QrCode;
