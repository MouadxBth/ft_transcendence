"use client";

import ChatSideBar from "@/components/chat/ChatSideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Resizeable from "@/components/ui/resizeable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { SocketsContext } from "@/contexts/SocketsContext";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import { useConversationContext } from "@/hooks/useConversationContext";
import { sendDM } from "@/lib/chat/chat-service-endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { handleClientScriptLoad } from "next/script";
import { useContext, useEffect, useRef } from "react";
import { ConversationMessage } from "@/components/chat/conversation/message/ConversationMessage";
import ConversationHeader from "@/components/chat/conversation/ConversationHeader";
import { ConversationInput } from "@/components/chat/conversation/ConversationInput";
import { ConversationMessageArea } from "@/components/chat/conversation/ConversationMessageArea";

export interface ConversationMessageProps {
	id: number;
	sender: string;
	avatar: string;
	message: string;
	date: Date;
}

const ChatPage = ({ params }: { params: { id: string } }) => {
	
	console.log("rendered Channel Page...");

	return (
		<article className="w-3/4 flex flex-col h-full">
			<ConversationHeader username={params.id} />
			<ConversationMessageArea username={params.id} />
			<ConversationInput />
		</article>
	);
};

export default ChatPage;
