"use client";

import conversationPage from "@/components/auth/protection/ConversationPage";

const ConversationLayout = ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) => {
	return <>{children}</>;
};

export default conversationPage(ConversationLayout);
