import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

export interface GenericFormFieldProps<T extends FieldValues> {
	label: string;
	description?: string;
	control: Control<T>;
	name: Path<T>;
	type: string;
	placeholder?: string;
	className?: string;
}

const GenericFormField = <T extends FieldValues>({
	label,
	description,
	control,
	name,
	type,
	placeholder,
	className,
}: GenericFormFieldProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn(className)}>
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
			)}
		/>
	);
};

export default GenericFormField;
