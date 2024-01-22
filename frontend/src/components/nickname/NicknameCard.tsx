import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { NicknameForm } from "./form/NicknameForm";

const NicknameCard = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className=" w-1/2 rounded-xl">
				<CardHeader className="pb-2">
					<CardTitle className="text-center">Welcome!</CardTitle>
					<CardDescription className="text-center">to ft_transcendence.</CardDescription>
				</CardHeader>

				<CardContent className="space-y-2 pb-2">
					<NicknameForm />
				</CardContent>
			</Card>
		</div>
	);
};

export default NicknameCard;
