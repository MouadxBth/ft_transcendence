"use client";

import { useState } from "react";
import { TabsContent } from "../../ui/tabs";
import ChannelTabSearch from "./ChannelTabSearch";
import ChannelTabPlus from "./ChannelTabPlus";
import ChannelTabList from "./list/ChannelTabList";
import { ChannelTabListItemProps } from "./list/ChannelTabListItem";
import { useChannelContext } from "@/hooks/useChannelContext";


const ChannelTab = () => {
	
	// const [all, setAll] = useState<ChannelTabListItemProps[]>(random);

	const {channelData, setChannelData} = useChannelContext();

	return (
		<TabsContent className="h-[calc(100%-2.5rem)] m-0" value="channels">
			<div className="flex flex-col w-full h-full">
				<div className="p-2 flex space-x-1">
					{/* <ChannelTabSearch
						all={all}
						setAll={setAll}
						/> */}
					<ChannelTabPlus />
				</div>
				<ChannelTabList data={channelData} />
			</div>
		</TabsContent>
	);
};

export default ChannelTab;
