<<<<<<< HEAD
"use client";

=======
>>>>>>> origin/main
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import { LoginForm } from "./form/LoginForm";

const LoginCard = () => {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-center">Login</CardTitle>
				<CardDescription className="text-center">Login to your account!</CardDescription>
			</CardHeader>

			<CardContent className="space-y-2 pb-2">
				<LoginForm />
			</CardContent>
		</Card>
	);
};

export default LoginCard;
