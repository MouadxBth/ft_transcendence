"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ProfileFormType, profileFormSchema } from "@/lib/types/profile-form";
import useProfileFrom from "@/hooks/useProfileForm";
import { cn } from "@/lib/utils";
import SettingsFormImageFields from "./SettingsFormImageFields";
import SettingsFormFields from "./SettingsFormFields";
import SettingsFormButtons from "./SettingsFormButtons";

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
				className={cn("grid grid-cols-2 gap-2 p-4 space-y-6 ", className)}
			>
				<SettingsFormImageFields form={form} />
				<SettingsFormFields form={form} />

				<SettingsFormButtons form={form} />
			</form>
		</Form>
	);
};

export default SettingsForm;
