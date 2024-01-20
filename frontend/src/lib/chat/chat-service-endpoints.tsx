import { ConversationApiResponse, ConversationApiResponseSchema } from "@/lib/types/conversation-api-response";
import { DirectMessageApiResponse, DirectMessageApiResponseSchema } from "@/lib/types/direct-message-api-response";
import axios from "axios"

const conversationEndpoint = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversation`,
	withCredentials: true
})

const directMessageEndpoint = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversation`,
	withCredentials: true
})

export const userEndpoint = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
	withCredentials: true
})

export async function fetchAllConversations() : Promise<ConversationApiResponse> {
	const res = await conversationEndpoint.get('');
	const parsedRes = ConversationApiResponseSchema.safeParse(res.data);
	
	console.log(parsedRes);
	
	if (!parsedRes.success) {
			throw parsedRes.error;
	}
	return parsedRes.data;
}

export async function fetchAllDirectMessages(target: string) : Promise<DirectMessageApiResponse> {
	const res = conversationEndpoint.get(`/${target}/dms`);
	return res.then((res) => {
		const parsedRes = DirectMessageApiResponseSchema.safeParse(res.data); 
		if (!parsedRes.success) {
			throw parsedRes.error;
		}
		return parsedRes.data;
	})
}

export default conversationEndpoint;