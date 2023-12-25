import Conversation from "./Conversation"
import Channel from "./Channel"
import { useState } from "react"

export default function MessagingSection (props: {showItem: string}) {

	if (props.showItem === 'chat')
		return (
			<div>
			<Conversation/>
			<Conversation/>
			<Conversation/>
			<Conversation/>
			<Conversation/>
			<Conversation/>
			<Conversation/>
			<Conversation/>
			<Conversation/>
			<Conversation/>
			</div>	
		)
		else
			return (
				<div>
				<Channel/>
				<Channel/>
				<Channel/>
				<Channel/>
				<Channel/>
				<Channel/>
				<Channel/>
				<Channel/>
				<Channel/>
				<Channel/>
				</div>	
			)
}