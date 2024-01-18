import { useToast } from "@/components/ui/use-toast";
import axiosClient from "@/lib/axios";
import { RegisterFormType } from "@/lib/types/register-form";
import { joinLines } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";

export interface UseRegisterProps {
	form: UseFormReturn<
		{
			username: string;
			firstName: string;
			lastName: string;
			password: string;
			confirmPassword: string;
		},
		any,
		undefined
	>;
}

const registerRequest = async (values: RegisterFormType) => {
	const { confirmPassword, ...data } = values;
	return await axiosClient.post("/auth/local/register", data);
};

const useRegister = ({ form }: UseRegisterProps) => {
	const { toast } = useToast();

	return useMutation({
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
};

export default useRegister;
