import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormType } from "@/lib/types/form/register-form";

type RegisterFormFieldProps = {
	control: Control<RegisterFormType, any>;
	name: keyof RegisterFormType;
	placeholder: string;
	label: string;
	type: string;
	className?: string;
};

export const RegisterationFormField: React.FC<RegisterFormFieldProps> = ({
	control,
	name,
	placeholder,
	label,
	type,
	className,
}) => (
	<FormField
		control={control}
		name={name}
		render={({ field }) => (
			<FormItem className={className}>
				<FormLabel>{label}</FormLabel>

				<FormControl>
					<Input
						placeholder={placeholder}
						{...field}
						type={type}
					/>
				</FormControl>

				<FormMessage className="text-xs" />
			</FormItem>
		)}
	/>
);
