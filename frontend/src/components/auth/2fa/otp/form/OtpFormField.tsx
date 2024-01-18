import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OtpFormType } from "@/lib/types/otp-form";

type OtpFormFieldProps = {
	control: Control<OtpFormType, any>;
	name: keyof OtpFormType;
	placeholder: string;
	label: string;
	type: string;
};

export const OtpFormField: React.FC<OtpFormFieldProps> = ({
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
