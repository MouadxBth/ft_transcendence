import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChannelFormType } from "@/lib/types/form/channel-form";

type ChannelFormFieldProps = {
	control: Control<ChannelFormType, any>;
	name: keyof ChannelFormType;
	placeholder: string;
	label: string;
	type: string;
};

export const ChannelFormField: React.FC<ChannelFormFieldProps> = ({
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
