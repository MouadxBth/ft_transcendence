"use client";

import Loading from "@/components/ui/loading";
import useQrCode from "@/hooks/authentication/useQrCode";
import Image from "next/image";
import QrCodeError from "./QrCodeError";

const QrCode = () => {
	const { data, isLoading, isError, error } = useQrCode();

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
