import { FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover } from "@/components/ui/popover";

import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { GameSentRequestsFormType } from "../../GameSentRequestsForm";
import { cn } from "@/lib/utils";
import SentRequestSelectionContent from "./SentRequestSelectionContent";
import SentRequestSelectionTrigger from "./SentRequestSelectionTrigger";

export interface SentRequestSelectionProps {
	field: ControllerRenderProps<GameSentRequestsFormType, "sender">;
	form: UseFormReturn<GameSentRequestsFormType, any, GameSentRequestsFormType>;
	className?: string;
}

const SentRequestSelection = ({ field, form, className }: SentRequestSelectionProps) => {
	return (
		<FormItem className={cn("flex flex-col", className)}>
			<FormLabel>Sent Request</FormLabel>
			<Popover>
				<SentRequestSelectionTrigger name={field.value} />
				<SentRequestSelectionContent
					selected={field.value}
					select={(name) => {
						form.setValue("sender", name);
					}}
				/>
			</Popover>
			<FormDescription className="text-xs">Cancel a game request sent to a friend!</FormDescription>
			<FormMessage />
		</FormItem>
	);
};

export default SentRequestSelection;
