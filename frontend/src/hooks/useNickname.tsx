import { useToast } from "@/components/ui/use-toast";
import { useAuthentication } from "./authentication/useAuthentication";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/lib/axios";
import { parseAuthenticatedUser } from "./authentication/useAuthenticatedUser";
import { AxiosError } from "axios";
import { joinLines } from "@/lib/utils";
import useSockets from "./socket/useSockets";
import { NicknameFormType } from "@/lib/types/form/nickname-form";

const useNickname = () => {
	const { toast } = useToast();
	const { authenticatedUser, setAuthenticatedUser } = useAuthentication();
	const { notifications } = useSockets();

	return useMutation({
		mutationKey: ["nickname"],
		mutationFn: async (data: NicknameFormType) => {
			if (data.avatar) {
				const formData = new FormData();
				formData.append("file", data.avatar![0]);

				await axiosClient.post("/upload/avatar/", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				});
			}

			if (data.banner) {
				const formData = new FormData();
				formData.append("file", data.banner![0]);

				await axiosClient.post("/upload/banner/", formData, {
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
			notifications?.emit("award_achievement", "Transcend");
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
