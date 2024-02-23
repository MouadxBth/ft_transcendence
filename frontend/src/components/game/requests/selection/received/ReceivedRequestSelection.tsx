import { FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover } from "@/components/ui/popover";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { GameReceivedRequestsFormType } from "../../GameReceivedRequestsForm";
import ReceivedRequestSelectionContent from "./ReceivedRequestSelectionContent";
import ReceivedRequestSelectionTrigger from "./ReceivedRequestSelectionTrigger";

export interface ReceivedRequestSelectionProps {
	field: ControllerRenderProps<GameReceivedRequestsFormType, "sender">;
	form: UseFormReturn<GameReceivedRequestsFormType, any, GameReceivedRequestsFormType>;
	className?: string;
}

const ReceivedRequestSelection = ({ field, form, className }: ReceivedRequestSelectionProps) => {
	return (
		<FormItem className={cn("flex flex-col", className)}>
			<FormLabel>Received Requests</FormLabel>
			<Popover>
				<ReceivedRequestSelectionTrigger name={field.value} />
				<ReceivedRequestSelectionContent
					selected={field.value}
					select={(name) => {
						form.setValue("sender", name);
					}}
				/>
			</Popover>
			<FormDescription className="text-xs">
				Accept/Decline a friend&apos;s request to a pong match!
			</FormDescription>
			<FormMessage />
		</FormItem>
	);
};

export default ReceivedRequestSelection;
