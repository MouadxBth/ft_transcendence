import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

const SuperModeFormItem = () => {
	return (
		<>
			<FormItem className="flex items-center space-x-3 space-y-0">
				<FormControl>
					<RadioGroupItem value="supermode" />
				</FormControl>
				<FormLabel className="font-normal">Super Mode</FormLabel>
			</FormItem>
		</>
	);
};

export default SuperModeFormItem;
