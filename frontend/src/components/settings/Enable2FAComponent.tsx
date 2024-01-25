import useEnable2FA from "@/hooks/authentication/useEnable2FA";
import { Button } from "../ui/button";

const Enable = () => {
	const twoFaMutation = useEnable2FA();

	return (
		<Button
			onClick={() => twoFaMutation.mutate()}
			disabled={twoFaMutation.isPending}
		>
			Enable 2fa
		</Button>
	);
};

export default Enable;
