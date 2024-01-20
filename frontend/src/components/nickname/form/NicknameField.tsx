import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NicknameFormType } from "@/lib/types/nickname-form";
import { Control } from "react-hook-form";

export interface NicknameFieldProps {
	control: Control<NicknameFormType, any>;
}

const NicknameField = ({ control }: NicknameFieldProps) => {
	return (
		<FormField
			control={control}
			name="nickname"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Nickname</FormLabel>
					<FormDescription className="text-xs">Choose a good unique name</FormDescription>

					<FormControl>
						<Input
							className="bg-secondary"
							placeholder="Enter a good unique nickname."
							{...field}
							type="text"
						/>
					</FormControl>

					<FormMessage className="text-xs" />
				</FormItem>
			)}
		/>
	);
};

export default NicknameField;
