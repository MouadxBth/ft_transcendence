import { useToast } from "@/components/ui/use-toast";
import { useAuthentication } from "./authentication/useAuthentication";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/lib/axios";
import { parseAuthenticatedUser } from "./authentication/useAuthenticatedUser";
import { AxiosError } from "axios";
import { joinLines } from "@/lib/utils";
import { ProfileFormType } from "@/lib/types/profile-form";

const useProfileFrom = () => {
	const { toast } = useToast();
	const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

	return useMutation({
		mutationKey: ["nickname", "firstname", "lastname", "password"],
		mutationFn: async (data: ProfileFormType) => {
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
					nickname:
						data.nickname !== "" && data.nickname !== authenticatedUser?.user.nickname
							? data.nickname
							: undefined,
					firstName:
						data.firstname !== "" && data.firstname !== authenticatedUser?.user.firstName
							? data.firstname
							: undefined,
					lastName:
						data.lastname !== "" && data.lastname !== authenticatedUser?.user.lastName
							? data.lastname
							: undefined,
					firstTime: false,
					password: data.password,
				},
				{
					withCredentials: true,
				}
			);
		},
		onSuccess: ({ data }) => {
			setAuthenticatedUser(parseAuthenticatedUser(data));
			toast({
				variant: "default",
				title: "Success!",
				description: "Profile updated successfully",
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

export default useProfileFrom;
