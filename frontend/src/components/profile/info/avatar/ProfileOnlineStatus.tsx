import { Badge } from "@/components/ui/badge";
import useSockets from "@/hooks/socket/useSockets";
import useOnlineStatus from "@/hooks/user/useOnlineStatus";
import { User } from "@/lib/types/user/user";
import { getOnlineStatusVariant } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export interface ProfileOnlineStatusProps {
	username: string;
	className?: string;
}

const ProfileOnlineStatus = ({ username, className }: ProfileOnlineStatusProps) => {
	const [onlineStatus, setOnlineStatus] = useState<string>("Offline");
	const [loading, setLoading] = useState(true);
	const { notifications } = useSockets();
	const { data, isLoading } = useOnlineStatus(username);

	useEffect(() => {
		notifications?.on("connected", (args: User) => {
			if (args.username === username) setOnlineStatus("Online");
		});

		notifications?.on("disconnected", (args: User) => {
			if (args.username === username) setOnlineStatus("Offline");
		});

		if (isLoading) return;

		if (data) {
			setOnlineStatus(data);
		}

		setLoading(false);
	}, [notifications, isLoading, data, username]);

	return (
		<Badge
			className={className}
			variant={loading ? "secondary" : getOnlineStatusVariant(onlineStatus)}
		>
			{loading ? "Loading" : onlineStatus}
		</Badge>
	);
};

export default ProfileOnlineStatus;
