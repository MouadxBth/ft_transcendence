import React, { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import GenericImageField from "@/components/image/GenericImageField";
import { ProfileFormType } from "@/lib/types/profile-form";

export interface AvatarImageFieldProps {
	control: Control<ProfileFormType, any>;
	setPreview?: Dispatch<SetStateAction<string>>;
	className: string;
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
			className={className}
		/>
	);
};

export default AvatarFormField;
