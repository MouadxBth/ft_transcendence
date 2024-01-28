import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FriendType } from "@/lib/types/friend";
import { User } from "@/lib/types/user";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { SetStateAction, useState } from "react";

export interface FriendsListProps {
	user: User;
	friends?: FriendType[];
}

const FriendList = ({ user, friends }: FriendsListProps) => {
	const [value, setValue] = useState("");
	const userfriend = friends?.find((friend) => friend.nickname === value);
	console.log(friends?.length);
	console.log(`selected === ${value}`);
	return (
		<>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className="w-[300px] justify-between"
				>
					{value ? (
						<div className="flex items-center w-full h-full space-x-2">
							<Avatar className="items-center">
								<AvatarImage
									src={
										userfriend?.avatar
											? userfriend?.avatar.startsWith("http")
												? userfriend?.avatar
												: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${userfriend?.avatar}`
											: ""
									}
									className="h-8 w-8 rounded-full object-cover"
								/>
								<AvatarFallback>{userfriend?.nickname.toUpperCase().slice(0, 2)}</AvatarFallback>
							</Avatar>
							<div>{userfriend?.nickname}</div>
						</div>
					) : (
						<p>Invite a friend...</p>
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0">
				<Command>
					<CommandInput placeholder="Search friend..." />
					<CommandEmpty>No Friend with that nickname</CommandEmpty>
					{friends?.length !== 0 ? (
						friends?.map((friend) => (
							<CommandGroup key={friend.username}>
								<CommandItem
									className="flex space-x-2"
									value={friend.nickname}
									onSelect={(currentValue: SetStateAction<string>) => {
										setValue(currentValue === value ? "" : currentValue);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === friend.nickname ? "opacity-100" : "opacity-0"
										)}
									/>
									<Avatar>
										<AvatarImage
											src={
												friend.avatar
													? friend.avatar.startsWith("http")
														? friend.avatar
														: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${friend.avatar}`
													: ""
											}
											className="h-10 w-10 rounded-full object-cover"
										/>
										<AvatarFallback>{friend.nickname.toUpperCase().slice(0, 2)}</AvatarFallback>
									</Avatar>
									<div className="text-md">
										{friend.nickname}
										<div className="text-muted-foreground text-xs">
											{friend.firstName} {friend.lastName}
										</div>
									</div>
								</CommandItem>
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

export default FriendList;
