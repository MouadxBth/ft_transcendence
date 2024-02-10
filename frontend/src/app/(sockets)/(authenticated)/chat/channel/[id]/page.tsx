"use client";

import ChannelInput from "@/components/chat/channel/ChannelInput";
import ChannelHeader from "@/components/chat/channel/header/ChannelHeader";
import ChannelMessageList from "@/components/chat/channel/message/ChannelMessageList";

const ChannelPage = ({ params }: { params: { id: string } }) => {
	return (
		<article className="w-3/4 h-full flex flex-col  bg-red-500">
			<ChannelHeader name={params.id} />
			<ChannelMessageList
				channel={params.id}
				className="h-full bg-blue-500"
			/>

			<ChannelInput channel={params.id} />
		</article>
	);
};

export default ChannelPage;
