import React from "react";
import FriendList from "./FriendList";
import FriendRequestList from "./FriendRequestList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/lib/types/user";
import { FriendType } from "@/lib/types/friend";

export interface FriendsCardContentProps {
	user: User;
	data: FriendType[] | undefined;
	forAuthenticatedUser: boolean;
}

const FriendsCardContentTabsList = ({
	forAuthenticatedUser,
}: {
	forAuthenticatedUser: boolean;
}) => {
	return (
		<div className="flex w-full justify-center">
			<TabsList className="">
				<TabsTrigger value="friends">Friends</TabsTrigger>
				{forAuthenticatedUser && <TabsTrigger value="requests">Requests</TabsTrigger>}
			</TabsList>
		</div>
	);
};

const FriendsCardContentFriendList = ({
	user,
	data,
	forAuthenticatedUser,
}: FriendsCardContentProps) => {
	return (
		<TabsContent value="friends">
			<ScrollArea className="border">
				<FriendList
					data={data}
					user={user}
					forAuthenticatedUser
				/>
			</ScrollArea>
		</TabsContent>
	);
};

const FriendsCardContentRequestList = ({
	user,
	data,
	forAuthenticatedUser,
}: FriendsCardContentProps) => {
	return (
		<>
			{forAuthenticatedUser && (
				<TabsContent value="requests">
					<ScrollArea className="border">
						<FriendRequestList data={data} />
					</ScrollArea>
				</TabsContent>
			)}
		</>
	);
};

const FriendsCardContent = ({ user, data, forAuthenticatedUser }: FriendsCardContentProps) => {
	return (
		<Tabs
			defaultValue="friends"
			className="w-full "
		>
			<FriendsCardContentTabsList forAuthenticatedUser />

			<FriendsCardContentFriendList
				user={user}
				data={data}
				forAuthenticatedUser={forAuthenticatedUser}
			/>

			<FriendsCardContentRequestList
				user={user}
				data={data}
				forAuthenticatedUser={forAuthenticatedUser}
			/>
		</Tabs>
	);
};

export default FriendsCardContent;
