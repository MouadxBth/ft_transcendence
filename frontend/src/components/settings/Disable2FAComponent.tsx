import useDisable2FA from "@/hooks/authentication/useDisable2FA";
import QrCode from "../auth/2fa/otp/qrcode/QrCode";
import { Button } from "../ui/button";

const Disable = () => {
	const twoFaMutation = useDisable2FA();

	return (
		<div className=" flex flex-col space-y-2 justify-center items-center ">
			<QrCode />
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
export default Disable;
