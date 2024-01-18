import { useToast } from "@/components/ui/use-toast";
import axiosClient from "@/lib/axios";
import { LoginFormType } from "@/lib/types/login-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { parseAuthenticatedUser } from "./useAuthenticatedUser";
import { joinLines } from "@/lib/utils";
import { AxiosError } from "axios";
import { useAuthentication } from "./useAuthentication";

const loginRequest = async (data: LoginFormType) => {
	return await axiosClient.post("/auth/local/login", data, {
		withCredentials: true,
	});
};

const useLogin = () => {
	const { push } = useRouter();
	const { toast } = useToast();
	const { setAuthenticatedUser } = useAuthentication();

	return useMutation({
		mutationKey: ["login"],
		mutationFn: loginRequest,
		onSuccess: ({ data }) => {
			setAuthenticatedUser(parseAuthenticatedUser(data));
			push("/profile");
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

export default useLogin;
