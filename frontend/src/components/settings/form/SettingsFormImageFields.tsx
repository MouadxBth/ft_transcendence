import { ProfileFormType } from "@/lib/types/profile-form";
import AvatarFormField from "../../nickname/form/image/AvatarFormField";
import BannerFormField from "../../nickname/form/image/BannerFormField";
import { UseFormReturn } from "react-hook-form";

export interface SettingsFormImageFieldsProps {
	form: UseFormReturn<ProfileFormType, any, undefined>;
}

const SettingsFormImageFields = ({ form }: SettingsFormImageFieldsProps) => {
	return (
		<div className="flex flex-col w-full col-span-2 h-full space-y-4">
			<AvatarFormField
				className="border-hidden"
				control={form.control}
			/>
			<BannerFormField
				className="border-hidden"
				control={form.control}
			/>
		</div>
	);
};
export default SettingsFormImageFields;
