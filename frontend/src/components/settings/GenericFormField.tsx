import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileFormType } from "@/lib/types/profile-form";
import { Control, FieldValues, Path } from "react-hook-form";

interface GenericFormFieldProps<ProfileFormType extends FieldValues> {
	label: string;
	description?: string;
	control: Control<ProfileFormType>;
	name: Path<ProfileFormType>;
	type: string;
	placeholder?: string;
	classname?: string;
}

const GenericFormField = ({
	label,
	description,
	control,
	name,
	type,
	placeholder,
	classname,
}: GenericFormFieldProps<ProfileFormType>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<>
					<FormItem className={classname}>
						<FormLabel>
							{label} <span className="text-xs"></span>
						</FormLabel>
						{description && <FormDescription className="text-xs">{description}</FormDescription>}
						<FormControl>
							<Input
								className="bg-secondary"
								type={type}
								{...field}
								value={field.value?.toString() || ""}
								placeholder={placeholder}
							/>
						</FormControl>
						<FormMessage className="text-xs" />
					</FormItem>
				</>
			)}
		/>
	);
};

export default GenericFormField;
