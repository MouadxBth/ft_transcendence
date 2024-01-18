"use client";

import { useState } from "react";
import { TabsContent } from "../../ui/tabs";
import ConversationTabList from "./ConversationTabList";
import { ConversationTabListItemProps } from "./ConversationTabListItem";
import ConversationTabPlus from "./ConversationTabPlus";
import ConversationTabSearch from "./ConversationTabSearch";

const random = Array.from({ length: 10 }).map((_, i, a) => {
	return {
		nickname: `nickname-${a.length - i}`,
		avatar: "https://github.com/shadcn.png",
		lastMessage: "Hello, World",
		date: new Date(),
	} as ConversationTabListItemProps;
});

const ConversationTab = () => {
	const [all, setAll] = useState<ConversationTabListItemProps[]>(random);

	return (
		<TabsContent value="conversations">
			<div className="flex flex-col w-full p-0 m-0 h-[calc(100vh-40px)]">
				<div className="p-2 flex space-x-1">
					<ConversationTabSearch
						all={all}
						setAll={setAll}
						/>
					<ConversationTabPlus />
				</div>
				<ConversationTabList data={all} />
			</div>
		</TabsContent>
	);
};

export default ConversationTab;
