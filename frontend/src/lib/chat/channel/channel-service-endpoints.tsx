import { CreateChannelDto } from "@/components/chat/channel/CreateChannelForm";
import { JoinChannelFormType } from "@/components/chat/channel/JoinChannelForm";
import { ChannelApiResponseSchema } from "@/lib/types/channel-api-response";
import { ChannelListApiResponse, 
		ChannelListApiResponseSchema, 
		ChannelDmApiResponse, 
		ChannelDmApiResponseSchema, 
		ChannelUserListApiResponseSchema,
		ChannelUserApiResponseSchema} from "@/lib/types/channel-api-response";

import axios, { HttpStatusCode } from "axios"

export const ChannelEndpoint = axios.create({
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

export async function fetchAllChannels() : Promise<ChannelListApiResponse> {
	const res = await ChannelEndpoint.get('');
	const parsedRes = ChannelListApiResponseSchema.safeParse(res.data);
	
	console.log(parsedRes);
	
	if (!parsedRes.success) {
			throw parsedRes.error;
	}
	return parsedRes.data;
}

export async function fetchChannelDirectMessages(target: string) : Promise<ChannelDmApiResponse> {
	
	const res = ChannelEndpoint.get(`/${target}/messages`);

	return res.then((res) => {
		console.log("dmsss:", res.data);
		const parsedRes = ChannelDmApiResponseSchema.safeParse(res.data); 
		if (!parsedRes.success) {
			throw parsedRes.error;
		}
		return parsedRes.data;
	})
}

export async function leaveChannel(target: string) {
	return await ChannelEndpoint.delete(`/${target}/leave`)
}

export async function fetchChannelUsers(target: string) {
	
	const res =  await ChannelEndpoint.get(`/${target}/member`)
	
	const parsedRes = ChannelUserListApiResponseSchema.safeParse(res.data); 
	if (!parsedRes.success) {
		throw parsedRes.error;
	}
	return parsedRes.data;
}

export async function fetchChannelMember(channel: string, username: string) {
	
	const res =  await ChannelEndpoint.get(`/${channel}/member/${username}`)
	
	const parsedRes = ChannelUserApiResponseSchema.safeParse(res.data); 
	if (!parsedRes.success) {
		throw parsedRes.error;
	}
	return parsedRes.data;
}

export async function fetchChannel(target: string) {
	
	const res =  await ChannelEndpoint.get(`/${target}`)
	
	const parsedRes = ChannelApiResponseSchema.safeParse(res.data); 
	if (!parsedRes.success) {
		throw parsedRes.error;
	}
	return parsedRes.data;
}

export async function changeChannelPassword(target: string, newPass: string) {
	// TODO
}
