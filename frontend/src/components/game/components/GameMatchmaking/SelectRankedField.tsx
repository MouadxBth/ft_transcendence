import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { Matchmakingprops } from "./GameMatchmaking";

const SelectRankedField = ({ form }: Matchmakingprops) => {
	return (
		<>
			<FormField
				control={form.control}
				name="ranked"
				render={({ field }) => (
					<FormItem className="space-y-3 flex flex-col justify-center items-center">
						<FormDescription>choose whether you want to play ranked or not</FormDescription>
						<div className="flex items-center space-x-3 justify-center">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<span className="text-white">Ranked</span>
						</div>
					</FormItem>
				)}
			/>
		</>
	);
};

export default SelectRankedField;
