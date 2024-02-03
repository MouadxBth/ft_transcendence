import { useEffect, useState } from "react";
import useFriendsFetch from "@/hooks/user/friends/useFriendsFetch";

import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FriendType } from "@/lib/types/friend/friend";
import { Matchmakingprops } from "./GameMatchmaking";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";

const InviteField = ({ form }: Matchmakingprops) => {
	const { authenticatedUser } = useAuthentication();
	const [value, setValue] = useState("");
	const username = authenticatedUser!.user.username;
	const { data, isLoading, isSuccess, isError, error } = useFriendsFetch(username);
	const [loading, setLoading] = useState(true);
	const [friends, setFriends] = useState<FriendType[]>([]);
	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			return;
		}

		if (data) setFriends(data);
		setLoading(false);
	}, [data, isLoading, isError, isSuccess, error]);
	const userfriend = data?.find((friend) => friend.nickname === value);
	return (
		<>
			<FormItem className="space-y-3 flex flex-col justify-center items-center">
				<Popover>
					{value ? (
						<p className="text-xs text-muted-foreground">
							Invite <span className="underline-offset-1">{value}</span> to a match
						</p>
					) : (
						<p className="text-xs text-muted-foreground">Leave empty for auto matchmaking</p>
					)}
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
										<AvatarFallback>
											{userfriend?.nickname.toUpperCase().slice(0, 2)}
										</AvatarFallback>
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
							{data?.length !== 0 ? (
								data?.map((friend) => (
									<CommandGroup key={friend.username}>
										<CommandItem
											className="flex space-x-2"
											value={friend.nickname}
											onSelect={(currentValue) => {
												setValue(currentValue === value ? "" : currentValue);
												console.log(value);
												console.log(currentValue);
												form.setValue("invite", currentValue === value ? "" : currentValue);
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
				</Popover>
			</FormItem>
		</>
	);
};

export default InviteField;
