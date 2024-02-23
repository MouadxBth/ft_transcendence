import { UseFormReturn } from "react-hook-form";
import { Button } from "../../ui/button";
import { ProfileFormType } from "@/lib/types/form/profile-form";

export interface SettingsFormButtonsProps {
	form: UseFormReturn<ProfileFormType, any, ProfileFormType>;
}

const SettingsFormButtons = ({ form }: SettingsFormButtonsProps) => {
	const handleResetForm = () => {
		form.reset();
	};
	return (
		<div className="col-span-2 flex flex-row-reverse items-centerbg-red-500">
			<Button
				type="submit"
				className="ml-2"
			>
				Update
			</Button>
			<Button
				variant="outline"
				onClick={handleResetForm}
			>
				Cancel
			</Button>
		</div>
	);
};

export default SettingsFormButtons;
