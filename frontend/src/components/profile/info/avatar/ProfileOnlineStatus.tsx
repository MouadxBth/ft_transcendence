import { Badge } from "@/components/ui/badge";
import useSockets from "@/hooks/socket/useSockets";
import useOnlineStatus from "@/hooks/user/useOnlineStatus";
import { User } from "@/lib/types/user";
import React, { useEffect, useState } from "react";

export interface ProfileOnlineStatusProps {
	username: string;
	className?: string;
}

const ProfileOnlineStatus = ({ username, className }: ProfileOnlineStatusProps) => {
	const [online, setOnline] = useState(false);
	const [loading, setLoading] = useState(true);
	const { notifications } = useSockets();
	const { data, isLoading } = useOnlineStatus(username);

	useEffect(() => {
		notifications?.on("connected", (args: User) => {
			if (args.username === username) setOnline(true);
		});

		notifications?.on("disconnected", (args: User) => {
			if (args.username === username) setOnline(false);
		});

		if (isLoading) return;

		setOnline(data!);
		setLoading(false);
	}, [notifications, isLoading, data, username]);

	return (
		<Badge
			className={className}
			variant={loading ? "secondary" : online ? "default" : "destructive"}
		>
			{loading ? "Loading" : online ? "Online" : "Offline"}
		</Badge>
	);
};

export default ProfileOnlineStatus;
