'use client'

import { useState } from "react";
import ChatBar from "./ChatBar";
import MessageContent from "./MessageContent";
import SendBar from "./SendBar";
import { useEffect } from "react";
import { UserDataType, userContext } from "@/app/chat/userContext";
import { useContext } from "react";

export default function ConverationMessageView({user} : {user:string}) {
	
	const {userData, setUserData} = useContext(userContext);
	
	function getUserConversationList(name: string) {
		return userData.conversations.filter((item) => item.user === name)
	}

	const data = getUserConversationList(user);

	function onNewConversationMessage(value: string) {
		let tmp = data[0].data.slice();
		var d = {...userData};
		d.conversations.filter((item) => item.user === user)[0].data.push({content: value, senderId: 1});
		console.log(d);
		setUserData({...d});
	}

	console.log("chat rendered!");
	return (
		<div className="flex flex-col justify-between h-screen w-full px-3 py-1">
			<ChatBar user={user}/>
			<div id="message-content" className="flex flex-row w-full h-full overflow-y-scroll">
				<MessageContent user={user} tab="chat" data={[...data[0].data]}/>
			</div>
			<SendBar user={user} onMessage={onNewConversationMessage}/>
		</div>
	);
}