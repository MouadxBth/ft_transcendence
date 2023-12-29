import Image from "next/image"

export default function Conversation(props: {name: string}) {
	return (
	<div className="flex h-full w-full border-t-2 border-white">
		<div className="min-w-max min-h-max">
			<Image src="/img/generic_user.png" alt="a generic image of a user profile" width={100} height={100} />
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