import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";

export interface SelectedFriendProps {
	value: string;
	friend: any;
}

const SelectedFriend = (props: SelectedFriendProps) => {
	return (
		<>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className="w-[300px] justify-between"
				>
					{props.value ? (
						<div className="flex items-center w-full h-full space-x-2">
							<Avatar className="items-center">
								<AvatarImage
									src={
										props.friend?.avatar
											? props.friend?.avatar.startsWith("http")
												? props.friend?.avatar
												: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${props.friend?.avatar}`
											: ""
									}
									className="h-8 w-8 rounded-full object-cover"
								/>
								<AvatarFallback>{props.friend?.nickname.toUpperCase().slice(0, 2)}</AvatarFallback>
							</Avatar>
							<div>{props.friend?.nickname}</div>
						</div>
					) : (
						<p>Invite a friend...</p>
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
		</>
	);
};

export default SelectedFriend;
