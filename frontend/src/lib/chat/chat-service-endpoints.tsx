import { ConversationApiResponse, ConversationApiResponseSchema } from "@/lib/types/conversation-api-response";
import { DirectMessageApiResponse, DirectMessageApiResponseSchema } from "@/lib/types/direct-message-api-response";
import axios from "axios"

const conversationEndpoint = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API_HOST}/api/v1/conversation`,
	withCredentials: true
})

const directMessageEndpoint = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API_HOST}/api/v1/conversation`,
	withCredentials: true
})

export const userEndpoint = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API_HOST}/api/v1/user`,
	withCredentials: true
})

export async function fetchAllConversations() : Promise<ConversationApiResponse> {
	const res = conversationEndpoint.get('');
	return res.then((res) => {
		const parsedRes = ConversationApiResponseSchema.safeParse(res.data); 
		if (!parsedRes.success) {
			throw parsedRes.error;
		}
		return parsedRes.data;
	})
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