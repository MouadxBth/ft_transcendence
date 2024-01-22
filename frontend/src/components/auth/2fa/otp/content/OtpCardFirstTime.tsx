import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OtpForm } from "../form/OtpForm";
import QrCode from "../qrcode/QrCode";

const OtpCardFirstTime = () => {
	return (
		<Card className=" w-1/2 rounded-xl">
			<CardHeader className="pb-2">
				<CardTitle className="text-center">Activate 2FA:</CardTitle>
				<CardDescription className="text-center">
					The 2FA OTP from your authentication app
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-2 pb-2">
				<p className="text-sm text-muted-foreground">
					1- Scan the QR Code with your authentication app
				</p>
				<div className="flex justify-center  rounded-xl">
					<QrCode />
				</div>
				<p className="text-sm text-muted-foreground">
					2- Enter the OTP from your authentication app
				</p>
				<OtpForm />
			</CardContent>
		</Card>
	);
};

export default OtpCardFirstTime;
