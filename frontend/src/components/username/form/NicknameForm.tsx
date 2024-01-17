"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { joinLines } from "@/lib/utils";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { authenticatedUserSchema } from "@/lib/types/authenticated-user";
import FormButton from "@/components/auth/FormButton";
import axiosClient from "@/lib/axios";
import { NicknameFormType, nicknameFormSchema } from "@/lib/types/nickname-form";
import { useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageField from "./ImageField";
import NicknameField from "./NicknameField";

const parseAuthenticatedUser = (data: unknown) => {
	const result = authenticatedUserSchema.safeParse(data);

	console.log(result);

	if (!result || !result.success)
		throw new Error(`Unable to parse data into an AuthenticatedUser ${result.error.message}`);

	return result.data;
};

export const NicknameForm = () => {
	const { toast } = useToast();
	const { authenticatedUser, setAuthenticatedUser } = useAuthentication();
	const [preview, setPreview] = useState("");

	const form = useForm<NicknameFormType>({
		resolver: zodResolver(nicknameFormSchema),
		defaultValues: {
			nickname: "",
		},
	});

	const login = useMutation({
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
			console.log("NICKNAME UPDATED ", parseAuthenticatedUser(data));
			setAuthenticatedUser(parseAuthenticatedUser(data));
			// push("/profile");
		},
		onError: (error: Error) => {
			const message =
				error instanceof AxiosError && error.response
					? joinLines(error.response.data.message)
					: error.message;

			console.log(error);
			toast({
				variant: "destructive",
				title: "Error!",
				description: message,
			});
		},
	});

	async function onSubmit(data: NicknameFormType) {
		login.mutate(data);
	}

	return (
		<Form {...form}>
			<form
				id="nickname"
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<div className="w-full flex justify-center space-x-8 items-center py-4">
					<ImagePreview src={preview} />
					<div className="flex flex-col space-y-4">
						<ImageField
							control={form.control}
							setPreview={setPreview}
						/>
						<NicknameField control={form.control} />
					</div>
				</div>
			</form>

			<FormButton
				isPending={login.isPending}
				form="nickname"
			>
				Submit
			</FormButton>
		</Form>
	);
};
