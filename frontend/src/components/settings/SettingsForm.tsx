"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ProfileFormType, profileFormSchema } from "@/lib/types/profile-form";
import useProfileFrom from "@/hooks/usProfileForm";
import FilesField from "./FilesField";
import Fields from "./TextFields";
import FormButtons from "./FromButtons";
import { cn } from "@/lib/utils";

const SettingsForm = ({ className }: { className?: string }) => {
	const nickname = useProfileFrom();

	const form = useForm<ProfileFormType>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			nickname: "",
			firstname: "",
			lastname: "",
			password: "",
			confirmpassword: "",
		},
	});

	async function onSubmit(data: ProfileFormType) {
		if (Object.values(data).every((value) => value === "" || value === undefined)) return;

		nickname.mutate(data);
		form.reset();
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn(className)}
			>
				<FilesField form={form} />
				<Fields form={form} />

				<FormButtons form={form} />
			</form>
		</Form>
	);
};

export default SettingsForm;
