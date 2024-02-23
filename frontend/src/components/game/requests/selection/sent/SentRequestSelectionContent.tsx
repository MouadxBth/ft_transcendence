import { Command, CommandEmpty, CommandGroup, CommandInput } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import SentRequestSelectionList from "./SentRequestSelectionList";

export interface SentRequestSelectionContentProps {
	select: (value: string) => void;
	selected: string | undefined;
	className?: string;
}

const SentRequestSelectionContent = ({
	className,
	selected,
	select,
}: SentRequestSelectionContentProps) => {
	return (
		<PopoverContent className={cn("w-[400px] p-0", className)}>
			<Command>
				<CommandInput placeholder="Search for a request..." />
				<CommandEmpty>No request sent to a friend with that nickname was found!</CommandEmpty>
				<CommandGroup>
					<SentRequestSelectionList
						selected={selected}
						select={select}
					/>
				</CommandGroup>
			</Command>
		</PopoverContent>
	);
};

export default SentRequestSelectionContent;
