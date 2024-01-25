import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { ProfileFormType } from "@/lib/types/profile-form";
import GenericFormField from "../../generic/GenericFormField";
import { UseFormReturn } from "react-hook-form";
import settingsFormFieldsContent from "./SettingsFormFieldsContent";

export interface SettingsFormFieldsProps {
	form: UseFormReturn<ProfileFormType, any, undefined>;
}

const SettingsFormFields = ({ form }: SettingsFormFieldsProps) => {
	const { authenticatedUser } = useAuthentication();

	return (
		<>
			{settingsFormFieldsContent(authenticatedUser!).map((element, index) => (
				<GenericFormField
					key={index}
					{...element}
					control={form.control}
				/>
			))}
		</>
	);
};

export default SettingsFormFields;
