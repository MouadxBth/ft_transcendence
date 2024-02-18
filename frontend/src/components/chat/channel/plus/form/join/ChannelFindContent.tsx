import { Command, CommandEmpty, CommandGroup, CommandInput } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ChannelFindList from "./ChannelFindList";

export interface ChannelFindContentProps {
	className?: string;
	select: (value: string, status: string) => void;
	selected: string;
}

const ChannelFindContent = ({ className, selected, select }: ChannelFindContentProps) => {
	return (
		<PopoverContent className={cn("w-[400px] p-0", className)}>
			<Command>
				<CommandInput placeholder="Search channel..." />
				<CommandEmpty>No channel found.</CommandEmpty>
				<CommandGroup>
					<ChannelFindList
						selected={selected}
						select={select}
					/>
				</CommandGroup>
			</Command>
		</PopoverContent>
	);
};

export default ChannelFindContent;
