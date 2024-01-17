import { Separator } from "@/components/ui/separator";
import { FriendType } from "@/lib/types/friend";
import { UserRoundCheck, UserRoundX } from "lucide-react";
import Image from "next/image";

const FriendRequestListItem = ({ nickname, avatar }: FriendType) => {
	return (
		<>
			<div className="flex justify-between">
				<div className="flex space-x-2">
					<Image
						className=" rounded-full"
						src={avatar}
						alt={nickname}
						width={32}
						height={32}
					/>
					<span className="text-md">{nickname}</span>
				</div>
				<div className="flex space-x-4">
					<UserRoundX className=" h-6 w-auto text-red-500" />
					<UserRoundCheck className=" h-6 w-auto text-green-500" />
				</div>
			</div>
			<Separator className="my-2" />
		</>
	);
};

export default FriendRequestListItem;
