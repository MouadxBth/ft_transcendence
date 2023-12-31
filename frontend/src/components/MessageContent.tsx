import SingleMessage from "./SingleMessage";
import {useEffect} from "react";
import { useContext } from "react";
import { userContext } from "@/app/chat/userContext";

export default function MessageContent(props: {user: string, data: any}) {
	console.log("render for message content");
	useEffect(() => {
		console.log("inside usEffect");
		var elem = document.getElementById("message-content");
		if (elem)
		{
			elem.scrollTop = elem?.scrollHeight;
		}
		},
		[props.data]);

	return (
	<div className="flex flex-col justify-start h-full w-full p-7">
		{props.data.map((message: any) => <SingleMessage other={message.senderId ? true : false} message={message.content}/>)}
	</div>
	)
}