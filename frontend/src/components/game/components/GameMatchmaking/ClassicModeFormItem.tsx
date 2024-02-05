import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";

const ClassicModeFormItem = () => {
	return (
		<>
			<FormItem className="flex items-center space-x-3 space-y-0">
				<FormControl>
					<RadioGroupItem value="classicmode" />
				</FormControl>
				<FormLabel className="font-normal">Classic Mode</FormLabel>
			</FormItem>
		</>
	);
};

export default ClassicModeFormItem;
