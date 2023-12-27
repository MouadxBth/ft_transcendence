import ChatBar from "./ChatBar";
import SendBar from "./SendBar";

export default function ChatMessageView() {
	return (
		<div className="flex flex-col justify-between w-full">
			<ChatBar/>
			<div className="flex flex-row justify-center w-full h-full">
				<div className="flex flex-col justify-center w-fit">
					<div>
						<h1 className="text-white">
							Messages HERE
						</h1>
					</div>
				</div>
			</div>
			<SendBar/>
		</div>
	);
}