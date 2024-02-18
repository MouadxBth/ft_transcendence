"use client";

import React from "react";
import ConversationQuit from "./ConversationQuit";
import { useConversations } from "@/hooks/chat/conversation/useConversations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConversationChallenge from "./ConversationChallenge";
import ProfileBlockButton from "@/components/profile/info/block/ProfileBlockButton";

export interface ConversationHeaderProps {
	name: string;
}

const ConversationHeader = ({ name }: ConversationHeaderProps) => {
	const { conversations } = useConversations();
	const { username, nickname, firstName, lastName, avatar } = conversations.find(
		({ target }) => target.username === name
	)!.target;

	const avatarSource = avatar.startsWith("http")
		? avatar
		: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${avatar}`;

	return (
		<div className="flex items-center justify-between py-2 px-6 border">
			<div className="flex items-center space-x-4">
				<Avatar>
					<AvatarImage
						className="object-cover"
						src={avatarSource}
						alt={username}
					/>
					<AvatarFallback>{nickname.substring(0, 2)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<div>{nickname}</div>
					<div className="text-xs">{`${firstName} ${lastName}`}</div>
				</div>
			</div>
			<div className="flex space-x-2">
				<ProfileBlockButton
					target={name}
					className=" flex-row-reverse rounded"
				/>
				<ConversationChallenge
					name={name}
					className="rounded"
				/>
				<ConversationQuit
					name={name}
					className="rounded"
				/>
			</div>
		</div>
	);
};

export default ConversationHeader;
