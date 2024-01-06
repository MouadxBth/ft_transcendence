import Image from "next/image"

export default function Channel(props: {name: string}) {
	return (
		<div className="flex justify-center items-center h-24 w-full ">
			<div className="flex h-full w-[40%] items-center">
				<div className="flex-initial shrink-0">
					<Image src={`https://robohash.org/${props.name}`} alt="a generic image of a user profile" width={70} height={70} className="rounded-full h-[100%]" />
				</div>
			</div>
			<div className="flex flex-initial flex-col w-full ml-5 justify-center">
				<div>
					<h3 className="text-left">
						{props.name}
					</h3>
				</div>
			</div>
		</div>
	)
}