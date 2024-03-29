import React, { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import GenericImageField from "@/components/generic/GenericImageField";
import { NicknameFormType } from "@/lib/types/form/nickname-form";

export interface AvatarImageFieldProps {
	control: Control<NicknameFormType, any>;
	setPreview?: Dispatch<SetStateAction<string>>;
}

const AvatarImageField = ({ control, setPreview }: AvatarImageFieldProps) => {
	return (
		<GenericImageField
			label="Avatar"
			description="You can choose to upload a picture, or one will be given to you in case you don't"
			control={control}
			name="avatar"
			type="file"
			setPreview={setPreview}
		/>
	);
};

export default AvatarImageField;
