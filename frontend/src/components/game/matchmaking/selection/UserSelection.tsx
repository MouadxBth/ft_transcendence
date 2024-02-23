import { FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover } from "@/components/ui/popover";

import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { GameMatchmakingFormType } from "../GameMatchmakingForm";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import UserSelectionTrigger from "./UserSelectionTrigger";
import UserSelectionContent from "./UserSelectionContent";

export interface UserSelectionProps {
	field: ControllerRenderProps<GameMatchmakingFormType, "user">;
	form: UseFormReturn<GameMatchmakingFormType, any, GameMatchmakingFormType>;
	className?: string;
	defaultSelection?: string;
}

const UserSelection = ({ field, form, defaultSelection, className }: UserSelectionProps) => {
	useEffect(() => {
		if (defaultSelection) {
			field.value = defaultSelection;
			form.setValue("user", defaultSelection);
		}
	}, [field, form, defaultSelection]);

	return (
		<FormItem className={cn("flex flex-col", className)}>
			<FormLabel>Friend</FormLabel>
			<Popover>
				<UserSelectionTrigger name={field.value} />
				<UserSelectionContent
					selected={field.value}
					select={(name) => {
						if (field.value === name) {
							form.setValue("user", undefined);
							return;
						}
						form.setValue("user", name);
					}}
				/>
			</Popover>
			<FormDescription className="text-xs">Challenge a user to a pong match!</FormDescription>
			<FormMessage />
		</FormItem>
	);
};

export default UserSelection;
