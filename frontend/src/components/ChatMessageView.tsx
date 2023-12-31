'use client'

import { useState } from "react";
import ChatBar from "./ChatBar";
import MessageContent from "./MessageContent";
import SendBar from "./SendBar";
import { useEffect } from "react";
import { UserDataType, userContext } from "@/app/chat/userContext";
import { useContext } from "react";

const messageData = [{
	user: "madsquirrel",
	data: [
		{ content: "yo", senderId: 0 },
		{ content: "whazap", senderId: 1 }
	]
}, {
	user: "Dummy",
	data: [
		{ content: "hi", senderId: 0 },
		{ content: "yo, homie?", senderId: 1 },
		{ content: "what ya doing bro", senderId: 0 }
	]
}
]
//case where there is none not handled


export default function ChatMessageView(props: {user: string}) {
	
	const {userData, setUserData} = useContext(userContext);

	function getItem(data: UserDataType, name: string) {
		return data.conversations.filter((item) => item.user === name)
	}

	const data = getItem(userData, props.user);

	function onNewMessage(value: string) {
		let tmp = data[0].data.slice();
		var d = {...userData};
		d.conversations.filter((item) => item.user === props.user)[0].data.push({content: value, senderId: 1});
		console.log(d);
		setUserData({...d});
	}

	console.log("chat rendered!");
	return (
		<div className="flex flex-col justify-between h-full w-full">
			<ChatBar user={props.user}/>
			<div id="message-content" className="flex flex-row w-full h-full overflow-y-scroll">
				<MessageContent user={props.user} data={[...data[0].data]}/>
			</div>
			<SendBar user={props.user} onMessage={onNewMessage}/>
		</div>
	);
}