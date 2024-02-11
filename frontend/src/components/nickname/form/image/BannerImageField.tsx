import React, { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import GenericImageField from "@/components/generic/GenericImageField";
import { NicknameFormType } from "@/lib/types/form/nickname-form";

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
