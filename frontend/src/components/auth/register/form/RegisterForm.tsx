"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterationFormField } from "./RegisterFormField";
import AuthProviders from "../../AuthProviders";
import HorizontalSeparator from "@/components/ui/horizontal-separator";
import FormButton from "../../FormButton";
import useRegister from "@/hooks/authentication/useRegister";
import registerFormFields from "./RegisterFromFields";
import { RegisterFormType, registerFormSchema } from "@/lib/types/form/register-form";

export const RegistrationForm = () => {
	const form = useForm<RegisterFormType>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			username: "",
			firstName: "",
			lastName: "",
			password: "",
			confirmPassword: "",
		},
	});

	const register = useRegister({ form });

	function onSubmit(values: RegisterFormType) {
		register.mutate(values);
	}

	return (
		<Form {...form}>
			<form
				id="registration"
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 max-sm:grid-cols-1 gap-2"
			>
				{registerFormFields.map((field) => {
					return (
						<RegisterationFormField
							key={field.name}
							control={form.control}
							{...field}
						/>
					);
				})}
			</form>
			<HorizontalSeparator text="Or" />

			<AuthProviders
				width={20}
				height={20}
			/>
			<FormButton
				form="registration"
				isPending={register.isPending}
			>
				Register
			</FormButton>
		</Form>
	);
};
