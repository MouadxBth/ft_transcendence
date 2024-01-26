import { ConversationApiResponse, ConversationApiResponseSchema } from "@/lib/types/conversation-api-response";
import { DirectMessageApiResponse, DirectMessageApiResponseSchema } from "@/lib/types/direct-message-api-response";
import axios from "axios"
import { HttpStatusCode } from "axios";

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

export const createConversation = async (username: string) => {
	const res = await conversationEndpoint.post("/" + username);
	if (res.status != HttpStatusCode.Created)
		throw Error(res.data)
	return (res.data)
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

interface DirectMessage {
	content: string;
	target: string;
}

export async function sendDM(payload: DirectMessage) {
	const res = await conversationEndpoint.post(`${payload.target}/send`, payload);
	if (res.status === HttpStatusCode.Created)
		return res.data;
	throw Error(res.data);
}

export default conversationEndpoint;