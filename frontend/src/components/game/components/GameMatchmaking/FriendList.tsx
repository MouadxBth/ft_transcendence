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
										friends!.find((friend) => friend.nickname === value)?.avatar.startsWith("http")
											? user!.avatar
											: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${friends!.find((friend) => friend.nickname === value)?.avatar}`
									}
									className="h-8 w-8 rounded-full object-cover"
								/>
								<AvatarFallback>hi</AvatarFallback>
							</Avatar>
							<div>{friends!.find((friend) => friend.nickname === value)?.nickname}</div>
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
					<CommandEmpty>No Friend found. try automatchmaking</CommandEmpty>
					<CommandGroup>
						{friends!.map((friend) => (
							<CommandItem
								className="flex space-x-2"
								key={friend.nickname}
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
											friend.avatar.startsWith("http")
												? user.avatar
												: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${friend.avatar}`
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
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</>
	);
};

export default FriendList;
