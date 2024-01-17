import Image from "next/image";
import { Separator } from "../ui/separator";

export interface UserSearchListItemProps {
	nickname: string;
	avatar: string;
}

const UserSearchListItem = ({ nickname, avatar }: UserSearchListItemProps) => {
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
			</div>
			<Separator className="my-2" />
		</>
	);
};

export default UserSearchListItem;
