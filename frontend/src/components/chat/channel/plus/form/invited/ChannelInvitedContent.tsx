import { Command, CommandEmpty, CommandGroup, CommandInput } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ChannelInvitedList from "./ChannelInvitedList";

export interface ChannelInvitedContentProps {
	className?: string;
	select: (value: string) => void;
	selected: string;
}

const ChannelInvitedContent = ({ className, selected, select }: ChannelInvitedContentProps) => {
	return (
		<PopoverContent className={cn("w-[400px] p-0", className)}>
			<Command>
				<CommandInput placeholder="Search channel..." />
				<CommandEmpty>No channel found.</CommandEmpty>
				<CommandGroup>
					<ChannelInvitedList
						selected={selected}
						select={select}
					/>
				</CommandGroup>
			</Command>
		</PopoverContent>
	);
};

export default ChannelInvitedContent;
