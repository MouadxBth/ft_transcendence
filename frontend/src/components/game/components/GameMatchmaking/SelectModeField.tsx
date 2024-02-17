import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import React from "react";
import { Matchmakingprops } from "./GameMatchmaking";
import SuperModeFormItem from "./SuperModeFormItem";
import ClassicModeFormItem from "./ClassicModeFormItem";

const SelectModeField = ({ form }: Matchmakingprops) => {
	return (
		<>
			<FormField
				control={form.control}
				name="mode"
				render={({ field }) => (
					<FormItem className="space-y-3 flex flex-col justify-center items-center text-white">
						<FormDescription>choose your game mode</FormDescription>
						<FormControl>
							<RadioGroup
								onValueChange={field.onChange}
								defaultValue={field.value}
								className="flex space-x-1 items-center justify-center space-y-0"
							>
								<ClassicModeFormItem />
								<SuperModeFormItem />
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};

export default SelectModeField;
