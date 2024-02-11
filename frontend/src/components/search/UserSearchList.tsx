import { User } from "@/lib/types/user/user";
import UserSearchListItem from "./UserSearchListItem";

export interface UserSearchListProps {
	data: User[];
}

const UserSearchList = ({ data }: UserSearchListProps) => {
	return (
		<div className="p-4 max-h-32 text-center w-full">
			{!data || !data.length
				? "No Results"
				: data.map((user) => (
						<UserSearchListItem
							key={user.nickname}
							{...user}
						/>
					))}
		</div>
	);
};

export default UserSearchList;
