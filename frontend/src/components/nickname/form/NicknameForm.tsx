"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormButton from "@/components/auth/FormButton";
import { NicknameFormType, nicknameFormSchema } from "@/lib/types/nickname-form";
import { useState } from "react";
import ImageField from "./image/ImageField";
import NicknameField from "./NicknameField";
import ImagePreview from "./image/ImagePreview";
import useNickname from "@/hooks/useNickname";

export const NicknameForm = () => {
	const form = useForm<NicknameFormType>({
		resolver: zodResolver(nicknameFormSchema),
		defaultValues: {
			nickname: "",
		},
	});

	const [preview, setPreview] = useState("");
	const nickname = useNickname();

	async function onSubmit(data: NicknameFormType) {
		nickname.mutate(data);
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
				isPending={nickname.isPending}
				form="nickname"
			>
				Submit
			</FormButton>
		</Form>
	);
};
