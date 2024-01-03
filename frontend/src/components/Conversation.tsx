import Image from "next/image"

export default function Conversation(props: {name: string}) {
	return (
	<div className="flex justify-center items-center h-28 w-full ">
		<div className="flex h-full w-[40%] items-center">
			<div>
				<Image src={`https://robohash.org/${props.name}`} alt="a generic image of a user profile" width={60} height={60} className="rounded-full"/>
			</div>
		</div>
		<div className="flex flex-col w-full ml-5 justify-center">
			<div>
				<h3 className="text-left">
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