import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormType } from "@/lib/types/login-form";

type LoginFormFieldProps = {
	control: Control<LoginFormType, any>;
	name: keyof LoginFormType;
	placeholder: string;
	label: string;
	type: string;
};

export const LoginFormField: React.FC<LoginFormFieldProps> = ({
	control,
	name,
	placeholder,
	label,
	type,
}) => (
	<FormField
		control={control}
		name={name}
		render={({ field }) => (
			<FormItem>
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
