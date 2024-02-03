import { ChannelEndpoint } from "./channel-service-endpoints"

export interface ApiChannelMember {
	member: string,
	channel: string,
}

export async function banChannelMember(member: ApiChannelMember) {
	return await ChannelEndpoint.post(`/ban`, member)
}

export async function muteChannelMember(member: ApiChannelMember) {
	return await ChannelEndpoint.post(`/mute`, member)
}

export async function inviteChannelMember(member: ApiChannelMember) {
	return await ChannelEndpoint.post(`/invite`, member)
}

export async function addChannelAdmin(member: ApiChannelMember) {
	return await ChannelEndpoint.post(`/admin/add`, member)
}

export async function blockChannelMember(member: ApiChannelMember) {
	// return await ChannelEndpoint.post(`/admin/add`, member)
	throw Error("NOT IMPLEMENTED!")
}

