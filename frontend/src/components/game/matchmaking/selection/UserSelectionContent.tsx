import { Command, CommandEmpty, CommandGroup, CommandInput } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import UserSelectionList from "./UserSelectionList";

export interface UserSelectionContentProps {
	select: (value: string) => void;
	selected: string | undefined;
	className?: string;
}

const UserSelectionContent = ({ className, selected, select }: UserSelectionContentProps) => {
	return (
		<PopoverContent className={cn("w-[400px] p-0", className)}>
			<Command>
				<CommandInput placeholder="Search for a user..." />
				<CommandEmpty>No user with that nickname was found!</CommandEmpty>
				<CommandGroup>
					<UserSelectionList
						selected={selected}
						select={select}
					/>
				</CommandGroup>
			</Command>
		</PopoverContent>
	);
};

export default UserSelectionContent;
