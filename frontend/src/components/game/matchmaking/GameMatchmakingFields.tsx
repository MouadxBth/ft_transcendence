import { FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ControllerRenderProps } from "react-hook-form";

export interface GameMatchmakingFieldsProps {
	field: ControllerRenderProps<
		{
			type: "classic" | "super";
			friend?: string | undefined;
		},
		"type"
	>;
}

const GameMatchmakingFields = ({ field }: GameMatchmakingFieldsProps) => {
	return (
		<RadioGroup
			onValueChange={field.onChange}
			defaultValue="classic"
			className="flex space-x-1 "
		>
			<FormItem className="flex items-center space-x-3 space-y-0">
				<FormControl>
					<RadioGroupItem value="classic" />
				</FormControl>
				<FormLabel className="font-normal">Classic</FormLabel>
			</FormItem>

			<FormItem className="flex items-center space-x-3 space-y-0">
				<FormControl>
					<RadioGroupItem value="super" />
				</FormControl>
				<FormLabel className="font-normal">Super</FormLabel>
			</FormItem>
		</RadioGroup>
	);
};

export default GameMatchmakingFields;
