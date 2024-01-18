import { useToast } from "@/components/ui/use-toast";
import axiosClient from "@/lib/axios";
import { OtpFormType } from "@/lib/types/otp-form";
import { joinLines } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { parseAuthenticatedUser } from "./useAuthenticatedUser";
import { useAuthentication } from "./useAuthentication";

const useOtp = () => {
	const { toast } = useToast();
	const { setAuthenticatedUser } = useAuthentication();

	return useMutation({
		mutationKey: ["otp"],
		mutationFn: async (data: OtpFormType) => {
			return await axiosClient.post(
				`/auth/2fa/`,
				{
					totp: data.otp,
				},
				{
					withCredentials: true,
				}
			);
		},
		onSuccess: ({ data }) => {
			setAuthenticatedUser(parseAuthenticatedUser(data));
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

export default useOtp;
