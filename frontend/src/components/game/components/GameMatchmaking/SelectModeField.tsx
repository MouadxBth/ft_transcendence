import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Matchmakingprops } from "./GameMatchmaking";

const SelectModeField = ({ form }: Matchmakingprops) => {
	return (
		<>
			<FormField
				control={form.control}
				name="mode"
				render={({ field }) => (
					<FormItem className="space-y-3 flex flex-col justify-center items-center">
						<FormDescription>choose your game mode</FormDescription>
						<FormControl>
							<RadioGroup
								onValueChange={field.onChange}
								defaultValue={field.value}
								className="flex space-x-1 items-center justify-center space-y-0"
							>
								<FormItem className="flex items-center space-x-3 space-y-0">
									<FormControl>
										<RadioGroupItem value="classicmode" />
									</FormControl>
									<FormLabel className="font-normal">Classic Mode</FormLabel>
								</FormItem>
								<FormItem className="flex items-center space-x-3 space-y-0">
									<FormControl>
										<RadioGroupItem value="supermode" />
									</FormControl>
									<FormLabel className="font-normal">Super Mode</FormLabel>
								</FormItem>
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
