import { ChannelType } from "@/lib/types/chat/channel/channel";
import { useState } from "react";
import ChatSidebarContentList from "../../sidebar/ChatSidebarContentList";
import ChannelTabList from "../list/ChannelTabList";
import ChannelTabPlus from "../plus/ChannelTabPlus";
import ChannelTabSearch from "../search/ChannelTabSearch";

export interface ChannelTabContentProps {
	channels: ChannelType[];
	loading: boolean;
}

const ChannelTabContent = ({ channels, loading }: ChannelTabContentProps) => {
	const [query, setQuery] = useState("");

	return (
		<>
			<div className="p-2 flex space-x-2 border-b">
				<ChannelTabSearch setQuery={setQuery} />
				<ChannelTabPlus />
			</div>
			<ChatSidebarContentList>
				<ChannelTabList
					loading={loading}
					channels={channels}
					query={query}
				/>
			</ChatSidebarContentList>
		</>
	);
};

export default ChannelTabContent;
