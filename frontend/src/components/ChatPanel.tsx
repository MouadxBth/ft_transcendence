'use client'

import Tab from "./Tab"
import ConversationList from "./ConversationList";
import ChannelList from "./ChannelList";


export default function  ChatPanel(props: {tab: string, changeTab: (tab: string) => void}) {
	return (
		<div className="flex flex-col overflow-auto text-white w-full h-full border rounded-xl border-gray-500 ">
			<div className="flex mb-2">
				<Tab value="chat" active={props.tab === "chat" ? true : false} handler={props.changeTab} />
				<Tab value="channel" active={props.tab === "channel" ? true : false} handler={props.changeTab} />
			</div>
			{props.tab === "chat" ? <ConversationList/> : <ChannelList/>}
		</div>
	)
}