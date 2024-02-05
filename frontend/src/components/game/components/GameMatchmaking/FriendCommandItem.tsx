import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FieldValue, UseFormReturn } from "react-hook-form";

export interface FriendCommandItemProps {
	form: UseFormReturn<FieldValue<any>>;
	friend: any;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

const FriendCommandItem = (props: FriendCommandItemProps) => {
	return (
		<>
			<CommandItem
				className="flex space-x-2"
				value={props.friend.nickname}
				onSelect={(currentValue) => {
					props.setValue(currentValue === props.value ? "" : currentValue);
					props.form.setValue("invite", currentValue === props.value ? "" : currentValue);
				}}
			>
				<Check
					className={cn(
						"mr-2 h-4 w-4",
						props.value === props.friend.nickname ? "opacity-100" : "opacity-0"
					)}
				/>
				<Avatar>
					<AvatarImage
						src={
							props.friend.avatar
								? props.friend.avatar.startsWith("http")
									? props.friend.avatar
									: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${props.friend.avatar}`
								: ""
						}
						className="h-10 w-10 rounded-full object-cover"
					/>
					<AvatarFallback>{props.friend.nickname.toUpperCase().slice(0, 2)}</AvatarFallback>
				</Avatar>
				<div className="text-md">
					{props.friend.nickname}
					<div className="text-muted-foreground text-xs">
						{props.friend.firstName} {props.friend.lastName}
					</div>
				</div>
			</CommandItem>
		</>
	);
};

export default FriendCommandItem;
