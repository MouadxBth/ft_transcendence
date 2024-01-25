import useDisable2FA from "@/hooks/authentication/useDisable2FA";
import QrCode from "../../auth/2fa/otp/qrcode/QrCode";
import { Button } from "../../ui/button";

const Disable2FA = () => {
	const twoFaMutation = useDisable2FA();

	return (
		<div className="flex flex-col space-y-2 justify-center items-center h-fit">
			<p className="text-center text-xs text-muted-foreground">
				The QR code below is a crucial component for regenerating your Two-Factor Authentication
				(2FA) code in the event of loss or device change. Scan the QR code to link your
				authenticator app and generate a new 2FA code securely.
			</p>
			<QrCode />
			<p className="text-center text-xs text-muted-foreground">
				We highly recommend keeping Two-Factor Authentication (2FA) enabled to ensure the utmost
				security for your account. Disabling 2FA removes an additional layer of protection from your
				login process, potentially exposing your account to increased security risks.
			</p>
			<Button
				onClick={() => twoFaMutation.mutate()}
				disabled={twoFaMutation.isPending}
				variant="destructive"
			>
				Disable 2fa
			</Button>
		</div>
	);
};
export default Disable2FA;
