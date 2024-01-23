import { ChannelApiResponse, 
		ChannelApiResponseSchema, 
		ChannelDmApiResponse, 
		ChannelDmApiResponseSchema } from "@/lib/types/channel-api-response";

import axios from "axios"

const ChannelEndpoint = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/channel`,
	withCredentials: true
})

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
		
		console.log("dms data", res.data);
		
		const parsedRes = ChannelDmApiResponseSchema.safeParse(res.data); 
		if (!parsedRes.success) {
			throw parsedRes.error;
		}
		return parsedRes.data;
	})
}
