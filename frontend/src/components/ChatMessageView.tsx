import ChatBar from "./ChatBar";
import MessageContent from "./MessageContent";
import SendBar from "./SendBar";

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

function getItem(data: any, name: string) {
	return messageData.filter((item) => item.user === name)
}

export default function ChatMessageView(props: {user: string}) {
	const data = getItem(messageData, props.user);
	return (
		<div className="flex flex-col justify-between h-full w-full">
			<ChatBar user={props.user}/>
			<div className="flex flex-row w-full h-[80%]">
				<MessageContent user={props.user} data={data[0].data}/>
			</div>
			<SendBar user={props.user}/>
		</div>
	);
}