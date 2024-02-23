import { Command, CommandEmpty, CommandGroup, CommandInput } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ReceivedRequestSelectionList from "./ReceivedRequestSelectionList";

export interface ReceivedRequestSelectionContentProps {
	select: (value: string) => void;
	selected: string | undefined;
	className?: string;
}

const ReceivedRequestSelectionContent = ({
	className,
	selected,
	select,
}: ReceivedRequestSelectionContentProps) => {
	return (
		<PopoverContent className={cn("w-[400px] p-0", className)}>
			<Command>
				<CommandInput placeholder="Search for a request..." />
				<CommandEmpty>No request from a friend with that nickname was found!</CommandEmpty>
				<CommandGroup>
					<ReceivedRequestSelectionList
						selected={selected}
						select={select}
					/>
				</CommandGroup>
			</Command>
		</PopoverContent>
	);
};

export default ReceivedRequestSelectionContent;
