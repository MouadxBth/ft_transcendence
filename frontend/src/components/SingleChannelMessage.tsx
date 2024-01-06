import { userContext } from "@/app/chat/userContext"
import { useContext } from "react"

export default function SingleChannelMessage(props: {message: string, username: string, profileImg?: string}) {
		return (
			<div className="flex flex-row my-2 border-l border-white  w-full h-[10%] shrink-0 text-white">
				<div className="flex-initial h-full shrink-0">
					<img src={`https://robohash.org/${props.username}`} alt="a generic image of a user profile" className="max-w-none h-[100%] rounded-full" />
				</div>
				<div className="flex flex-col max-w-full justify-center">
					<div>
						<h2 className="text-gray-500">
							{props.username}
						</h2>
					</div>
					<div className="max-w-full">
						<h4>
							{props.message}
						</h4>
					</div>
				</div>
			</div>
		)
}