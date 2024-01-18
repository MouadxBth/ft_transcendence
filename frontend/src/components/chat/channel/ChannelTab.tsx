"use client";

import { useState } from "react";
import { TabsContent } from "../../ui/tabs";
import ChannelTabSearch from "./ChannelTabSearch";
import ChannelTabPlus from "./ChannelTabPlus";
import ChannelTabList from "./list/ChannelTabList";
import { ChannelTabListItemProps } from "./list/ChannelTabListItem";
import { useChannelContext } from "@/hooks/useChannelContext";

const random = Array.from({ length: 10 }).map((_, i, a) => {
	return {
		nickname: `nickname-${a.length - i}`,
		avatar: "https://github.com/shadcn.png",
		lastMessage: "Hello, World",
		date: new Date(),
	} as ChannelTabListItemProps;
});

const ChannelTab = () => {
	const [all, setAll] = useState<ChannelTabListItemProps[]>(random);

	const {channelData, setChannelData} = useChannelContext();

	return (
		<TabsContent value="channels">
			<div className="flex flex-col w-full p-0 m-0 h-[calc(100vh-40px)]">
				<div className="p-2 flex space-x-1">
					<ChannelTabSearch
						all={all}
						setAll={setAll}
						/>
					<ChannelTabPlus />
				</div>
				<ChannelTabList data={channelData} />
			</div>
		</TabsContent>
	);
};

export default ChannelTab;
