"use client";

import ChatSideBar from "@/components/chat/ChatSideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Resizeable from "@/components/ui/resizeable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";

const random = Array.from({ length: 20 }).map((_, i, a) => {
	return {
		id: i,
		sender: `nickname-${a.length - i}`,
		avatar: `https://robohash.org/${encodeURI(`nickname-${a.length - i}`)}`,
		message:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend sem et interdum euismod. Etiam felis risus, facilisis eu erat ut, sollicitudin feugiat ante. Fusce eget vehicula diam. Suspendisse congue enim sit amet dolor euismod mattis. Ut ornare, magna eget faucibus condimentum, mauris metus pretium sapien, ut viverra justo augue vel eros. Ut pharetra a tellus ac venenatis. Maecenas tempus ultricies mi, eget congue ipsum luctus ac. Morbi eleifend interdum tempus.",
		date: new Date(),
	} as MessageProps;
});

interface MessageProps {
	id: number;
	sender: string;
	avatar: string;
	message: string;
	date: Date;
}

const Message = ({ id, sender, avatar, message, date }: MessageProps) => {
	return (
		<div className="flex flex-col border">
			<div className="flex items-center space-x-2">
				<div className="py-2 px-4 flex items-center space-x-2">
					<Avatar>
						<AvatarImage
							src={avatar}
							alt={sender}
						/>
						<AvatarFallback>{sender}</AvatarFallback>
					</Avatar>
					<div>{sender}</div>
				</div>
				<div className="text-sm text-muted-foreground">{date.toDateString()}</div>
			</div>
			<div className="break-all whitespace-pre-wrap p-4">{message}</div>
		</div>
	);
};

const ChatPage = ({ params }: { params: { id: string } }) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, []);

	return (
		<article className="w-3/4 flex flex-col">
			<div className="flex items-center justify-center p-2 space-x-2">
				<Avatar>
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt={params.id}
					/>
					<AvatarFallback>{params.id}</AvatarFallback>
				</Avatar>
				<div>{params.id}</div>
			</div>
			{/* <div className="bg-blue-500 "> */}
			<ScrollArea className=" scroll">
				{!random || !random.length ? (
					<div className="p-5 bg-black">You don&apos;t any conversations yet!</div>
				) : (
					random.map(({ id, sender, message, avatar, date }) => (
						<Message
							key={sender}
							id={id}
							sender={sender}
							avatar={avatar}
							message={message}
							date={date}
						/>
					))
				)}
				<div ref={messagesEndRef} />
			</ScrollArea>
			{/* </div> */}
			<div className="h-20">
				<Textarea
					className="max-h-80 resize-none"
					placeholder="Type a message..."
				/>
			</div>
		</article>
	);
};

export default ChatPage;
