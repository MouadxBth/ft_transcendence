import React, { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import GenericImageField from "@/components/generic/GenericImageField";
import { cn } from "@/lib/utils";
import { ProfileFormType } from "@/lib/types/form/profile-form";

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
			className={cn(className)}
		/>
	);
};

export default BannerFormField;
