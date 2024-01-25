import { ProfileFormType } from "@/lib/types/profile-form";
import { GenericFormFieldProps } from "./GenericFormField";
import { AuthenticatedUser } from "@/lib/types/authenticated-user";

const fields = (authenticatedUser: AuthenticatedUser) => {
	return [
		{
			classname: "col-span-2",
			label: "Nickname",
			description: "your new nickname",
			name: "nickname",
			type: "text",
			placeholder: authenticatedUser?.user.nickname || "",
		},
		{
			label: "Firstname",
			description: "your new firstname",
			name: "firstname",
			type: "text",
			placeholder: authenticatedUser?.user.firstName || "",
		},
		{
			label: "Lastname",
			description: "your new lastname",
			name: "lastname",
			type: "text",
			placeholder: authenticatedUser?.user.lastName || "",
		},
		{
			label: "Password",
			description: "your new password",
			name: "password",
			type: "password",
			placeholder: "password",
		},
		{
			label: "Confirm password",
			description: "confirm your new password",
			name: "confirmpassword",
			type: "password",
			placeholder: "confirmpassword",
		},
	] as GenericFormFieldProps<ProfileFormType>[];
};

export default fields;
