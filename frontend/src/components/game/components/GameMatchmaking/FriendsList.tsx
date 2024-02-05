import { Command, CommandEmpty, CommandGroup, CommandInput } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { Dispatch, SetStateAction } from "react";
import { FieldValue, UseFormReturn } from "react-hook-form";
import FriendCommandItem from "./FriendCommandItem";

export interface FriendsListProps {
	form: UseFormReturn<FieldValue<any>>;
	value: string;
	data:
		| { username: string; nickname: string; avatar: string; firstName: string; lastName: string }[]
		| undefined;
	setValue: Dispatch<SetStateAction<string>>;
}

const FriendsList = (props: FriendsListProps) => {
	return (
		<>
			<PopoverContent className="w-[300px] p-0">
				<Command>
					<CommandInput placeholder="Search friend..." />
					<CommandEmpty>No Friend with that nickname</CommandEmpty>
					{props.data?.length !== 0 ? (
						props.data?.map((friend) => (
							<CommandGroup key={friend.username}>
								<FriendCommandItem
									form={props.form}
									friend={friend}
									value={props.value}
									setValue={props.setValue}
								/>
							</CommandGroup>
						))
					) : (
						<p className="py-6 text-center text-sm">No Friend found. try automatchmaking</p>
					)}
				</Command>
			</PopoverContent>
		</>
	);
};

export default FriendsList;
