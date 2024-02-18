"use client";

import useGame from "@/hooks/game/useGame";
import useAchievementNotification from "@/hooks/notifications/useAchievementNotifications";
import useChannelNotifications from "@/hooks/notifications/useChannelNotifications";
import useConversationNotifications from "@/hooks/notifications/useConversationNotifications";
import useErrorNotifications from "@/hooks/notifications/useErrorNotifications";
import useFriendStatusNotifications from "@/hooks/notifications/useFriendStatusNotifications";
import React from "react";

const SocketLayout = ({ children }: { children: React.ReactNode }) => {
	useErrorNotifications();
	useFriendStatusNotifications();
	useAchievementNotification();
	useConversationNotifications();
	useChannelNotifications();
	return <>{children}</>;
};

export default SocketLayout;
