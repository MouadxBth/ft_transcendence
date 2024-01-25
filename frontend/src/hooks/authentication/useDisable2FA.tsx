import { useToast } from "@/components/ui/use-toast";
import axiosClient from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { parseAuthenticatedUser } from "./useAuthenticatedUser";
import { joinLines } from "@/lib/utils";
import { AxiosError } from "axios";
import { useAuthentication } from "./useAuthentication";

const disable2FaRequest = async () => {
	return await axiosClient
		.post("auth/2fa/disable")
		.then(({ data }) => parseAuthenticatedUser(data));
};

const useDisable2FA = () => {
	const { toast } = useToast();
	const { setAuthenticatedUser } = useAuthentication();

	return useMutation({
		mutationKey: ["disable-2fa"],
		mutationFn: disable2FaRequest,
		onSuccess: (data) => {
			setAuthenticatedUser(data);
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

export default useDisable2FA;
