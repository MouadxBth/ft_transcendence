import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { OtpForm } from "../form/OtpForm";

const OtpCardContent = () => {
	return (
		<Card className=" w-1/2 rounded-xl">
			<CardHeader className="pb-2">
				<CardTitle className="text-center">Enter your 2FA OTP:</CardTitle>
				<CardDescription className="text-center">
					The 2FA OTP from your authentication app
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-2 pb-2">
				<OtpForm />
			</CardContent>
		</Card>
	);
};

export default OtpCardContent;
