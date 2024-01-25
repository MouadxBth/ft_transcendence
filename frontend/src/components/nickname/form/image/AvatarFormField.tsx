import React, { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import GenericImageField from "@/components/generic/GenericImageField";
import { ProfileFormType } from "@/lib/types/profile-form";
import { cn } from "@/lib/utils";

export interface AvatarImageFieldProps {
	control: Control<ProfileFormType, any>;
	setPreview?: Dispatch<SetStateAction<string>>;
	className?: string;
}

const AvatarFormField = ({ control, setPreview, className }: AvatarImageFieldProps) => {
	return (
		<GenericImageField
			label="Avatar"
			description="your new avatar"
			control={control}
			name="avatar"
			type="file"
			setPreview={setPreview}
			className={cn(className)}
		/>
	);
};

export default AvatarFormField;