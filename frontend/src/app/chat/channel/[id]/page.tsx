"use client";

import ChannelHeader from "@/components/chat/channel/ChannelHeader";
import ChannelInput from "@/components/chat/channel/ChannelInput";
import { ChannelMessageProps } from "@/components/chat/channel/message/ChannelMessage";
import ChannelMessageList from "@/components/chat/channel/message/ChannelMessageList";
import { useContext } from "react";
import AuthenticationContextProvider from "@/providers/AuthenticationContextProvider";
import ChannelContextProvider from "@/providers/ChannelDataContextProvider";

const random = Array.from({ length: 20 }).map((_, i, a) => {
	return {
		id: i,
		sender: `nickname-${a.length - i}`,
		avatar: `https://robohash.org/${encodeURI(`nickname-${a.length - i}`)}`,
		message:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend sem et interdum euismod. Etiam felis risus, facilisis eu erat ut, sollicitudin feugiat ante. Fusce eget vehicula diam. Suspendisse congue enim sit amet dolor euismod mattis. Ut ornare, magna eget faucibus condimentum, mauris metus pretium sapien, ut viverra justo augue vel eros. Ut pharetra a tellus ac venenatis. Maecenas tempus ultricies mi, eget congue ipsum luctus ac. Morbi eleifend interdum tempus.",
		date: new Date(),
	} as ChannelMessageProps;
});

const ChannelPage = ({ params }: { params: { id: string } }) => {
	return (
		<article className="w-3/4 flex flex-col">
			<ChannelContextProvider>
				<ChannelHeader name={params.id} />
				<ChannelMessageList name={params.id} />
				<ChannelInput name={params.id} />
			</ChannelContextProvider>
		</article>
	);
};

export default ChannelPage;
