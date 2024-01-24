"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { ProfileFormType, profileFormSchema } from "@/lib/types/profile-form";
import useProfileFrom from "@/hooks/usProfileForm";
import AvatarFormField from "../nickname/form/image/AvatarFormField";
import BannerFormField from "../nickname/form/image/BannerFormField";
import GenericFormField from "./GenericFormField";

const SettingsForm = ({ className }: { className?: string }) => {
	const { authenticatedUser } = useAuthentication();
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

	const handleRefresh = () => {
		form.reset();
	};

	async function onSubmit(data: ProfileFormType) {
		if (!Object.values(data).every((value) => value === "" || value === undefined)) {
			console.log(data);
			nickname.mutate(data);
			form.reset();
			console.log(data);
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={className}
			>
				<div className="flex flex-col w-full col-span-2 h-full space-y-4">
					<div className="flex w-full">
						<AvatarFormField
							className="w-full"
							control={form.control}
						/>
					</div>
					<div className="flex space-x-2">
						<BannerFormField
							className="w-full"
							control={form.control}
						/>
					</div>
				</div>
				<GenericFormField
					classname="col-span-2"
					label="Nickname"
					description="your new nickname"
					control={form.control}
					name="nickname"
					type="text"
					placeholder={authenticatedUser?.user.nickname || ""}
				/>
				<GenericFormField
					label="Firstname"
					description="your new firstname"
					control={form.control}
					name="firstname"
					type="text"
					placeholder={authenticatedUser?.user.firstName || ""}
				/>
				<GenericFormField
					label="Lastname"
					description="your new lastname"
					control={form.control}
					name="lastname"
					type="text"
					placeholder={authenticatedUser?.user.lastName || ""}
				/>
				<GenericFormField
					label="Password"
					description="your new password"
					control={form.control}
					name="password"
					type="password"
					placeholder="password"
				/>
				<GenericFormField
					label="Confirm password"
					description="confirm your new password"
					control={form.control}
					name="confirmpassword"
					type="password"
					placeholder="confirmpassword"
				/>
				<div className="col-span-2 space-x-2 flex justify-end items-center">
					<Button type="submit">Update</Button>
					<Button
						variant="outline"
						onClick={handleRefresh}
					>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default SettingsForm;
