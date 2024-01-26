"use client";

import Loading from "@/components/ui/loading";
import useQrCode from "@/hooks/authentication/useQrCode";
import QrCodeError from "./QrCodeError";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import ImageReverser from "./ImageReverser";

const QrCode = () => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading, isError, error } = useQrCode(authenticatedUser?.user.username!);

	if (isLoading) return <Loading className="h-12" />;

	if (isError) return <QrCodeError error={error} />;

	return <ImageReverser imageUrl={data!} />;
};

export default QrCode;
