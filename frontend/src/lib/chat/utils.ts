import { ChannelItem } from "@/hooks/useChannelContext"
import { fetchChannel, fetchChannelDirectMessages, fetchChannelMember } from "./channel/channel-service-endpoints";
import { fetchAllDirectMessages } from "./chat-service-endpoints";
import { ConversationItem } from "@/hooks/useConversationContext";
import fetchUser from "./user-service-endpoints";
import { CreateChannelDto } from "@/components/chat/channel/CreateChannelForm";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import { ChannelList } from "@/hooks/useChannelContext";

export async function createChannelItem(name: string, username: string) : Promise<ChannelItem> {
	
	const { messages } = await fetchChannelDirectMessages(name);
	const channel = await fetchChannel(name);
	// const ownerId = await fetchChannelMember(name, username);
	
	return {
		...channel,
		members: [],
		messages: messages || [],
		lastMessage: messages.length ? messages[messages.length - 1].content : "n/a"
	}		
}

export function findChannelItem(id: string, list: ChannelList) {
	return list.find((item) => item.name == id)
}

export async function getConversationItem(name: string) : Promise<ConversationItem> {
	
	const messages = await fetchAllDirectMessages(name);
	const {avatar, nickname, username} = await fetchUser(name);
	return {
		nickname: nickname,
		username: username,
		id: 5, // TODO: generate automatically
		avatar: avatar,
		messages: messages || [],
		lastMessage: messages.length ? messages[messages.length - 1].content : "n/a",
		createdAt: new Date(),
		updatedAt: new Date(),
	}		
}
