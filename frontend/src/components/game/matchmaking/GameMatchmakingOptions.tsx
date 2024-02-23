import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import React from "react";
import { GameMatchmakingFormType } from "./GameMatchmakingForm";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import GameMatchmakingFields from "./GameMatchmakingFields";

export interface GameMatchmakingOptionsProps {
	form: UseFormReturn<GameMatchmakingFormType, any, GameMatchmakingFormType>;
	className?: string;
}

const GameMatchmakingOptions = ({ form, className }: GameMatchmakingOptionsProps) => {
	return (
		<FormField
			control={form.control}
			name="type"
			render={({ field }) => (
				<FormItem className={cn("space-y-1", className)}>
					<FormLabel>Game type:</FormLabel>
					<FormControl>
						<GameMatchmakingFields field={field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default GameMatchmakingOptions;
