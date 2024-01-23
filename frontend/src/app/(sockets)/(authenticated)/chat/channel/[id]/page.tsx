"use client";

import ChannelHeader from "@/components/chat/channel/ChannelHeader";
import ChannelInput from "@/components/chat/channel/ChannelInput";
import ChannelMessageList from "@/components/chat/channel/message/ChannelMessageList";
import { useContext } from "react";
import AuthenticationContextProvider from "@/providers/AuthenticationContextProvider";
import ChannelContextProvider from "@/providers/ChannelDataContextProvider";

const ChannelPage = ({ params }: { params: { id: string } }) => {
	return (
		<article className="w-3/4 flex flex-col h-screen">
				<ChannelHeader name={params.id} />
				<ChannelMessageList name={params.id} />
				<ChannelInput name={params.id} />
		</article>
	);
};

export default ChannelPage;
