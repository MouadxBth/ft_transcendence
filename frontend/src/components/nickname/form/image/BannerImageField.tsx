import React, { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import { NicknameFormType } from "@/lib/types/nickname-form";
import GenericImageField from "@/components/image/GenericImageField";

export interface BannerImageFieldProps {
	control: Control<NicknameFormType, any>;
	setPreview?: Dispatch<SetStateAction<string>>;
}

const BannerImageField = ({ control, setPreview }: BannerImageFieldProps) => {
	return (
		<GenericImageField
			label="Banner"
			description="You can choose to upload a banner too!"
			control={control}
			name="banner"
			type="file"
			setPreview={setPreview}
		/>
	);
};

export default BannerImageField;
