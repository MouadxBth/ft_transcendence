"use client";

import useGame from "@/hooks/game/useGame";
import useAchievementNotification from "@/hooks/notifications/useAchievementNotifications";
import useErrorNotifications from "@/hooks/notifications/useErrorNotifications";
import useFriendStatusNotifications from "@/hooks/notifications/useFriendStatusNotifications";
import React from "react";

const SocketLayout = ({ children }: { children: React.ReactNode }) => {
	useErrorNotifications();
	useFriendStatusNotifications();
	useAchievementNotification();
	useGame();
	return <>{children}</>;
};

export default SocketLayout;
