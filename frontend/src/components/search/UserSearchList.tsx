import UserSearchListItem, { UserSearchListItemProps } from "./UserSearchListItem";

export interface UserSearchListProps {
	data: UserSearchListItemProps[] | undefined;
}

const UserSearchList = ({ data }: UserSearchListProps) => {
	return (
		<div className="p-4 max-h-32 text-center w-full">
			{!data || !data.length
				? "No Results"
				: data.map(({ nickname, avatar }) => (
						<UserSearchListItem
							key={nickname}
							nickname={nickname}
							avatar={avatar}
						/>
				  ))}
		</div>
	);
};

export default UserSearchList;
