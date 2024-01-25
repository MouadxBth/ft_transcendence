import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { ProfileFormType } from "@/lib/types/profile-form";
import fields from "./FieldsContent";
import GenericFormField from "./GenericFormField";
import { UseFormReturn } from "react-hook-form";

const Fields = ({ form }: { form: UseFormReturn<ProfileFormType, any, undefined> }) => {
	const { authenticatedUser } = useAuthentication();

	return (
		<>
			{fields(authenticatedUser!).map((element, index) => (
				<GenericFormField
					key={index}
					{...element}
					control={form.control}
				/>
			))}
		</>
	);
};

export default Fields;
