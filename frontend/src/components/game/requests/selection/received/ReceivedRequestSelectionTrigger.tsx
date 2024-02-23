import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";

export interface ReceivedRequestSelectionTriggerProps {
	name: string | undefined;
}

const ReceivedRequestSelectionTrigger = ({ name }: ReceivedRequestSelectionTriggerProps) => {
	return (
		<PopoverTrigger asChild>
			<FormControl>
				<Button
					variant="outline"
					role="combobox"
					className={cn("justify-between", !name && "text-muted-foreground")}
				>
					{name ?? "Select a request"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</FormControl>
		</PopoverTrigger>
	);
};

export default ReceivedRequestSelectionTrigger;
