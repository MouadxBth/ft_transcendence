"use client";

import useAchievementNotification from "@/hooks/notifications/useAchievementNotifications";
import useErrorNotifications from "@/hooks/notifications/useErrorNotifications";
import useFriendStatusNotifications from "@/hooks/notifications/useFriendStatusNotifications";
import React from "react";

const SocketLayout = ({ children }: { children: React.ReactNode }) => {
	useErrorNotifications();
	useFriendStatusNotifications();
	useAchievementNotification();
	return <>{children}</>;
};

export default SocketLayout;
