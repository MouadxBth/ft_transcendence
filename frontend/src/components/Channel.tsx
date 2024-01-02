import Image from "next/image"

export default function Channel(props: {name: string}) {
	return (
		<div className="flex h-full bg-slate-900 w-full border-2 border-white rounded-xl p-2 mb-2">
		<div className="h-full w-[40%] flex justtify-center">
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