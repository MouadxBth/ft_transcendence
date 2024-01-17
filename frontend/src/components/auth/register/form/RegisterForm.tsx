import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterationFormField } from "./RegisterFormField";
import { RegisterFormType, registerFormSchema } from "@/lib/types/register-form";
import axiosClient from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import AuthProviders from "../../AuthProviders";
import { AxiosError } from "axios";
import { joinLines } from "@/lib/utils";
import HorizontalSeparator from "@/components/ui/horizontal-separator";
import FormButton from "../../FormButton";

type FormFieldData = {
	name: keyof RegisterFormType;
	placeholder: string;
	label: string;
	type: string;
	className?: string;
};

const formFields: FormFieldData[] = [
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

const registerRequest = async (values: RegisterFormType) => {
	const { confirmPassword, ...data } = values;
	return await axiosClient.post("/auth/local/register", data);
};

export const RegistrationForm = () => {
	const { toast } = useToast();

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

	const register = useMutation({
		mutationKey: ["register"],
		mutationFn: registerRequest,
		onSuccess: () => {
			form.reset();
			toast({
				variant: "default",
				title: "Success!",
				description: "Registered successfully! you may log in",
			});
		},
		onError: (error: Error) => {
			console.error(error);

			const message =
				error instanceof AxiosError && error.response
					? joinLines(error.response.data.message)
					: error.message;

			toast({
				variant: "destructive",
				title: "Error!",
				description: message,
			});
		},
	});

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
				{formFields.map((field) => {
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
