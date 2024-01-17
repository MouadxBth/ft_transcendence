"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import { Loader2 } from "lucide-react";
import useFriends from "@/hooks/useFriends";
import { User } from "@/lib/types/user";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import FriendsCardContent from "./FriendsCardContent";

export interface FriendsCardProps {
	user: User;
}

const FriendsCard = ({ user }: FriendsCardProps) => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading } = useFriends(user ? user.username : null);

	if (isLoading) {
		return (
			<div className="flex justify-center">
				<Loader2 className="h-4 w-auto animate-spin" />
			</div>
		);
	}

	const forAuthenticatedUser = user.nickname === authenticatedUser?.user.nickname;

	return (
		<Card>
			<CardHeader className="p-0 pt-6 pl-6">
				<CardTitle>Friends</CardTitle>
				<CardDescription>
					{forAuthenticatedUser ? "Your" : `${user.nickname}'s`} friends
				</CardDescription>
			</CardHeader>

			<CardContent>
				<FriendsCardContent
					user={user}
					data={data}
					forAuthenticatedUser={forAuthenticatedUser}
				/>
			</CardContent>
		</Card>
	);
};

export default FriendsCard;
