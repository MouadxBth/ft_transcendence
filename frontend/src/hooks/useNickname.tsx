import { useToast } from "@/components/ui/use-toast";
import { useAuthentication } from "./authentication/useAuthentication";
import { useMutation } from "@tanstack/react-query";
import { NicknameFormType } from "@/lib/types/nickname-form";
import axiosClient from "@/lib/axios";
import { parseAuthenticatedUser } from "./authentication/useAuthenticatedUser";
import { AxiosError } from "axios";
import { joinLines } from "@/lib/utils";

const useNickname = () => {
	const { toast } = useToast();
	const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

	return useMutation({
		mutationKey: ["nickname"],
		mutationFn: async (data: NicknameFormType) => {
			if (data.image) {
				const formData = new FormData();
				formData.append("file", data.image![0]);

				await axiosClient.post("/avatar/", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				});
			}

			return await axiosClient.patch(
				`/user/${authenticatedUser?.user.username}`,
				{
					nickname: data.nickname,
					firstTime: false,
				},
				{
					withCredentials: true,
				}
			);
		},
		onSuccess: ({ data }) => {
			setAuthenticatedUser(parseAuthenticatedUser(data));
			// push("/profile");
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

export default useNickname;
