"use client";

import useAchievementNotification from "@/hooks/notifications/useAchievementNotifications";
import useConversationNotifications from "@/hooks/notifications/useConversationNotifications";
import useErrorNotifications from "@/hooks/notifications/useErrorNotifications";
import useFriendStatusNotifications from "@/hooks/notifications/useFriendStatusNotifications";
import React from "react";

const SocketLayout = ({ children }: { children: React.ReactNode }) => {
	useErrorNotifications();
	useFriendStatusNotifications();
	useAchievementNotification();
	useConversationNotifications();
	return <>{children}</>;
};

export default SocketLayout;
