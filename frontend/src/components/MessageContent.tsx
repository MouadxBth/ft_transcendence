import SingleMessage from "./SingleMessage";
import { useId } from "react";

export default function MessageContent(props: {user: string, data: any}) {
	return (
	<div className="flex flex-col justify-start w-full p-7">
		{/* <SingleMessage key="1" other={true} message="here we go again"/>
		<SingleMessage key="2" other={false} message="say what"/>
		<SingleMessage key="3" other={true} message="im just saying"/>
		<SingleMessage key="4" other={true} message="maybe not"/> */}
		{props.data.map((message: any) => <SingleMessage other={message.senderId ? true : false} message={message.content}/>)}
	</div>
	)
}