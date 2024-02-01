"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormButton from "@/components/auth/FormButton";
import { useState } from "react";
import NicknameField from "./NicknameField";
import ImagePreview from "./image/ImagePreview";
import useNickname from "@/hooks/useNickname";
import AvatarImageField from "./image/AvatarImageField";
import BannerImageField from "./image/BannerImageField";
import { NicknameFormType, nicknameFormSchema } from "@/lib/types/form/nickname-form";

export const NicknameForm = () => {
	const form = useForm<NicknameFormType>({
		resolver: zodResolver(nicknameFormSchema),
		defaultValues: {
			nickname: "",
		},
	});

	const [avatarPreview, setAvatarPreview] = useState("");
	const [bannerPreview, setBannerPreview] = useState("");
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
					<ImagePreview src={avatarPreview} />
					<div className="flex flex-col space-y-4">
						<AvatarImageField
							control={form.control}
							setPreview={setAvatarPreview}
						/>
						<BannerImageField
							control={form.control}
							setPreview={setBannerPreview}
						/>
						<NicknameField control={form.control} />
					</div>
					<ImagePreview src={bannerPreview} />
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
