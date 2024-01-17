"use client";

import React from "react";
import { Button } from "../../ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../../ui/card";
import HorizontalSeparator from "../../ui/horizontal-separator";
import AuthProviders from "../AuthProviders";
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
