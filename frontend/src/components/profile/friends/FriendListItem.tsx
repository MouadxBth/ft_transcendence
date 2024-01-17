import { Separator } from "@/components/ui/separator";
import { FriendType } from "@/lib/types/friend";
import { UserMinus } from "lucide-react";
import Image from "next/image";

const FriendListItem = ({ nickname, avatar }: FriendType) => {
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
				<div onClick={() => console.log("CLICKED!")}>
					<UserMinus className=" h-6 w-auto text-red-500 cursor-pointer" />
				</div>
			</div>
			<Separator className="my-2" />
		</>
	);
};

export default FriendListItem;
