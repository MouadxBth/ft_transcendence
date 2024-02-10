import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChannelFormProtectedType } from "./ChannelFormProtected";

type ChannelFormProtectedFieldProps = {
	control: Control<ChannelFormProtectedType, any>;
	name: keyof ChannelFormProtectedType;
	placeholder: string;
	label: string;
	type: string;
	className?: string;
};

export const ChannelFormProtectedField = ({
	control,
	name,
	placeholder,
	label,
	type,
	className,
}: ChannelFormProtectedFieldProps) => (
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
