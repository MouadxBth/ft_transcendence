"use client";

import channelPage from "@/components/auth/protection/ChannelPage";

const ChannelLayout = ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) => {
	return <>{children}</>;
};

export default channelPage(ChannelLayout);
