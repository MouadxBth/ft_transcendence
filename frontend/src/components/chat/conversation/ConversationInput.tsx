"use client";

import { Textarea } from "@/components/ui/textarea";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import useSockets from "@/hooks/socket/useSockets";
import useBlockStatus from "@/hooks/user/block/useBlockStatus";
import useBlockUpdate from "@/hooks/user/block/useBlockUpdate";
import { BlockStatusType } from "@/lib/types/block/block-status";
import React, { useEffect, useState } from "react";

export interface ConversationInputProps {
	target: string;
}

const getPlaceholderMessage = (condition: boolean, blocking: boolean, blockedBy: boolean) => {
	if (condition) {
		if (blocking) return "You are currently blocking this user";

		if (blockedBy) return "You are currently blocked by this user";
	}

	return "Type a message...";
};

const ConversationInput = ({ target }: ConversationInputProps) => {
	const { conversations } = useSockets();
	const { data, isLoading } = useBlockStatus(target);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState<BlockStatusType | undefined>(undefined);
	const { authenticatedUser } = useAuthentication();
	const { blocking, blockedBy, targetNickname, targetId, senderId } = status || {};
	const condition =
		authenticatedUser?.user.username === targetId || authenticatedUser?.user.username === senderId;

	useBlockUpdate(target, setStatus);

	useEffect(() => {
		if (isLoading) return;

		if (data) setStatus(data);
		setLoading(false);
	}, [isLoading, data]);

	return (
		<Textarea
			className="max-h-80 resize-none"
			placeholder={getPlaceholderMessage(condition, blocking ?? false, blockedBy ?? false)}
			disabled={loading || (condition && (blocking || blockedBy))}
			callback={(value) => {
				if (/^\s*$/.test(value)) return;
				conversations?.emit("send_message", {
					target: target,
					content: value,
				});
			}}
		/>
	);
};

export default ConversationInput;
