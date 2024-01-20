import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import { RegistrationForm } from "./form/RegisterForm";

const RegisterCard = () => {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-center">Register</CardTitle>
				<CardDescription className="text-center">Register a new account!</CardDescription>
			</CardHeader>

			<CardContent className="space-y-2 pb-2">
				<RegistrationForm />
			</CardContent>
		</Card>
	);
};

export default RegisterCard;
