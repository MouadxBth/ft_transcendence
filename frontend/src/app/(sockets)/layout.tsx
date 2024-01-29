"use client";

import useAchievementNotification from "@/hooks/notifications/useAchievementNotifications";
import useErrorNotifications from "@/hooks/notifications/useErrorNotifications";
import useFriendStatusNotifications from "@/hooks/notifications/useFriendStatusNotifications";
import AuthenticationContextProvider from "@/providers/AuthenticationContextProvider";
import SocketsContextProvider from "@/providers/SocketsContextProvider";
import React from "react";

const SocketLayout = ({ children }: { children: React.ReactNode }) => {
	useErrorNotifications();
	useFriendStatusNotifications();
	useAchievementNotification();
	return (
		<AuthenticationContextProvider>
			<SocketsContextProvider>{children}</SocketsContextProvider>
		</AuthenticationContextProvider>
	);
};

export default SocketLayout;
