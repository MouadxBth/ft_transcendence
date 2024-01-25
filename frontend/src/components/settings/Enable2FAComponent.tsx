import useEnable2FA from "@/hooks/authentication/useEnable2FA";
import { Button } from "../ui/button";

const Enable = () => {
	const twoFaMutation = useEnable2FA();

	return (
		<div className="flex flex-col justify-center items-center space-y-12">
			<p className="text-center">
				Enhance the security of your account by enabling Two-Factor Authentication (2FA). With 2FA,
				an additional layer of protection is added to your login process, making it significantly
				more secure click the button &quot;Enable 2fa&quot; and follow the steps
			</p>
			<Button
				onClick={() => twoFaMutation.mutate()}
				disabled={twoFaMutation.isPending}
				className="w-1/2"
			>
				Enable 2fa
			</Button>
		</div>
	);
};

export default Enable;
