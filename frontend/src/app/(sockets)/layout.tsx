"use client";

import useAchievementNotification from "@/hooks/notifications/useAchievementNotifications";
import useChannelNotifications from "@/hooks/notifications/useChannelNotifications";
import useConversationNotifications from "@/hooks/notifications/useConversationNotifications";
import useErrorNotifications from "@/hooks/notifications/useErrorNotifications";
import useFriendStatusNotifications from "@/hooks/notifications/useFriendStatusNotifications";
import useGameRequestNotifications from "@/hooks/notifications/useGameRequestNotifications";
import React from "react";

const SocketLayout = ({ children }: { children: React.ReactNode }) => {
	useErrorNotifications();
	useFriendStatusNotifications();
	useAchievementNotification();
	useConversationNotifications();
	useChannelNotifications();
	useGameRequestNotifications();

	return <>{children}</>;
};

export default SocketLayout;
