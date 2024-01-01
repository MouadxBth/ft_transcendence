import Image from "next/image"

export default function Conversation(props: {name: string}) {
	return (
	<div className="flex h-full w-full border-t-2 border-white p-2">
		<div className="h-full w-[40%] flex justtify-center">
			<div>
				<Image src={`https://robohash.org/${props.name}`} alt="a generic image of a user profile" width={60} height={60} className="rounded-full"/>
			</div>
		</div>
		<div className="flex flex-col justify-center">
			<div>
				<h3>
					{props.name}
				</h3>
			</div>
			{/* <div className="text-gray-400">
				<h4>
					hey, what's up?
				</h4>
			</div> */}
		</div>
	</div>
	)
}