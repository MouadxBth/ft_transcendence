import Image from "next/image"

export default function Channel(props: {name: string}) {
	return (
	<div className="flex h-full w-full border-t-2 border-white">
		<div className="min-w-max min-h-max">
			<Image src={`https://robohash.org/${props.name}`} alt="a generic image of a user profile" width="100" height="100" />
		</div>
		<div className="flex flex-col justify-center">
			<div>
				<h3>
					{props.name}
				</h3>
			</div>
			{/* <div className="text-gray-400"> // maybe for last message
				<h4>
					Kouma: I'll beat your ass again haha
				</h4>
			</div> */}
		</div>
	</div>
	)
}