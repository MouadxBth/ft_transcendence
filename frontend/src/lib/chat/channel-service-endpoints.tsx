import { CreateChannelDto } from "@/components/chat/channel/CreateChannelForm";
import { JoinChannelFormType } from "@/components/chat/channel/JoinChannelForm";
import { ChannelApiResponse, 
		ChannelApiResponseSchema, 
		ChannelDmApiResponse, 
		ChannelDmApiResponseSchema } from "@/lib/types/channel-api-response";

import axios, { HttpStatusCode } from "axios"

const ChannelEndpoint = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/channel`,
	withCredentials: true
})


export async function createChannel(payload: CreateChannelDto) {
	const res  = await ChannelEndpoint.post('', payload);
	if (res.status != HttpStatusCode.Created)
		throw Error("channel cannot be created", {cause: res.data})
	return res.data;
}

export async function joinChannel(payload: JoinChannelFormType) {
	const res  = await ChannelEndpoint.post('/join', payload);
	return res.data;
}

export async function fetchAllChannels() : Promise<ChannelApiResponse> {
	const res = await ChannelEndpoint.get('');
	const parsedRes = ChannelApiResponseSchema.safeParse(res.data);
	
	console.log(parsedRes);
	
	if (!parsedRes.success) {
			throw parsedRes.error;
	}
	return parsedRes.data;
}

export async function fetchChannelDirectMessages(target: string) : Promise<ChannelDmApiResponse> {
	
	const res = ChannelEndpoint.get(`/${target}/messages`);

	return res.then((res) => {
		
		const parsedRes = ChannelDmApiResponseSchema.safeParse(res.data); 
		if (!parsedRes.success) {
			throw parsedRes.error;
		}
		return parsedRes.data;
	})
}
