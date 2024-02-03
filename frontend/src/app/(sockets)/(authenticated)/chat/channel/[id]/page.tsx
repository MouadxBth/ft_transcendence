"use client";

import ChannelHeader from "@/components/chat/channel/ChannelHeader";
import ChannelInput from "@/components/chat/channel/ChannelInput";
import ChannelMessageList from "@/components/chat/channel/message/ChannelMessageList";

const ChannelPage = ({ params }: { params: { id: string } }) => {
	return (
		<article className="w-3/4 flex flex-col h-full">
				<ChannelHeader name={params.id} />
				<ChannelMessageList name={params.id} />
				<ChannelInput name={params.id} />
		</article>
	);
};

export default ChannelPage;
