import React, { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import GenericImageField from "@/components/image/GenericImageField";
import { ProfileFormType } from "@/lib/types/profile-form";

export interface BannerImageFieldProps {
	control: Control<ProfileFormType, any>;
	setPreview?: Dispatch<SetStateAction<string>>;
	className?: string;
}

const BannerFormField = ({ control, setPreview, className }: BannerImageFieldProps) => {
	return (
		<GenericImageField
			label="Banner"
			description="your new banner"
			control={control}
			name="banner"
			type="file"
			setPreview={setPreview}
			className={className}
		/>
	);
};

export default BannerFormField;
