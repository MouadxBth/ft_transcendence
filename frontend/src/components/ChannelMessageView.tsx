'use client'

import { useState } from "react";
import ChatBar from "./ChatBar";
import MessageContent from "./MessageContent";
import SendBar from "./SendBar";
import { useEffect } from "react";
import { UserDataType, userContext } from "@/app/chat/userContext";
import { useContext } from "react";

export default function ChannelMessageView({user} : {user:string}) {
	
	const {userData, setUserData} = useContext(userContext);
	
	function getUserChannelList(name: string) {
		return userData.channels.filter((item) => item.user === name)
	}

	const data = getUserChannelList(user);

	function onNewChannelMessage(value: string) {
		let tmp = data[0].data.slice();
		var d = {...userData};
		d.channels.filter((item) => item.user === user)[0].data.push({user: userData.name, message: value});
		console.log(d);
		setUserData({...d});
	}

	console.log("channel message view rendered!");
	return (
		<div className="flex flex-col justify-between h-screen w-full px-3 py-1">
			<ChatBar user={user}/>
			<div id="message-content" className="flex flex-row w-full h-full overflow-y-scroll">
				<MessageContent user={user} tab="channel" data={[...data[0].data]}/>
			</div>
			<SendBar user={user} onMessage={onNewChannelMessage}/>
		</div>
	);
}