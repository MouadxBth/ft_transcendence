import SingleMessage from "./SingleMessage";
import {useEffect} from "react";
import { useContext } from "react";
import { userContext } from "@/app/chat/userContext";
import SingleChannelMessage from "./SingleChannelMessage";

export default function MessageContent(props: {user: string, data: any, tab: string}) {
	console.log("render for message content");
	useEffect(() => {
		console.log("inside usEffect");
		var elem = document.getElementById("message-content");
		if (elem) {
			elem.scrollTop = elem?.scrollHeight;
		}
		},
		[props.data]);
	if (props.tab === "chat")
		return (
			<div className="flex flex-col justify-start h-full w-full py-1">
				{props.data.map((message: any) => <SingleMessage other={message.senderId ? true : false} message={message.content}/>)}
			</div>
		)
	else
		return (
			<div className="flex flex-col justify-start h-full w-full py-1">
				{props.data.map((message: any) => <SingleChannelMessage username={message.user} message={message.message}/>)}
			</div>
		)
}