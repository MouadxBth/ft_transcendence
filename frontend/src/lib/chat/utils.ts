import { ChannelItem } from "@/hooks/useChannelContext"
import { fetchChannelDirectMessages } from "./channel-service-endpoints";

export async function getChannelItem(name: string) : Promise<ChannelItem> {
	
	const { messages } = await fetchChannelDirectMessages(name);
	
	return {
		name: name,
		avatar: "",
		date: new Date(),
		messages: messages || [],
		lastMessage: messages.length ? messages[messages.length - 1].content : "n/a"
	}		
}
