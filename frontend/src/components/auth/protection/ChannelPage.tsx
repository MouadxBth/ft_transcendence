"use client";

import Loading from "@/components/ui/loading";
import { useChannels } from "@/hooks/chat/channel/useChannels";
import ChannelForbidden from "@/components/chat/channel/forbidden/ChannelForbidden";

interface ChannelPageProps {
	children: React.ReactNode;
	params: { id: string };
}

export default function channelPage(Component: any) {
	return function ChannelPage(props: ChannelPageProps) {
		const { channels, isLoading } = useChannels();
		const channel = channels.find(
			(element) => element.name.toLowerCase() === props.params.id.toLowerCase()
		);

		if (isLoading) {
			return (
				<div className="w-3/4 h-full flex items-center justify-center">
					<Loading />
				</div>
			);
		}

		if (!channel) {
			return <ChannelForbidden />;
		}

		return <Component {...props} />;
	};
}
