import { RegisterFormType } from "@/lib/types/form/register-form";

export type RegisterFormFieldData = {
	name: keyof RegisterFormType;
	placeholder: string;
	label: string;
	type: string;
	className?: string;
};

const registerFormFields: RegisterFormFieldData[] = [
	{
		name: "username",
		placeholder: "Enter a good unique username.",
		label: "Username",
		type: "text",
		className: "col-span-2 max-sm:col-auto",
	},
	{
		name: "firstName",
		placeholder: "Enter your first name.",
		label: "First Name",
		type: "text",
	},
	{
		name: "lastName",
		placeholder: "Enter your last name.",
		label: "Last Name",
		type: "text",
	},
	{
		name: "password",
		placeholder: "Enter a strong password.",
		label: "Password",
		type: "password",
	},
	{
		name: "confirmPassword",
		placeholder: "Confirm your password.",
		label: "Confirm Password",
		type: "password",
	},
];

export default registerFormFields;
