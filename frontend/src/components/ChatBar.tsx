import Image from "next/image";


export default function chatBar(props: {user: string}) {
	return (
		<div className="flex flex-row bg-white w-full h-[10%]">
			<div className="basis-1/12 flex flex-col justify-center">
				<div className="flex w-full">
					<Image src="/img/user-black.png" alt="a generic image of a user profile" width={100} height={100}/>
				</div>
			</div>
			<div className="basis-2/12 flex flex-col justify-center">
				<div>
					<h2>
						{props.user}
					</h2>
				</div>
				<div>
					<h4>
						level 8
					</h4>
				</div>
			</div>
			<div className="basis-9/12 flex flex-col justify-center">
				<div className="flex justify-end p-3">
					<div>
						<Image src="/img/Ellipsis.png" alt="a generic image of a user profile" width={30} height={30}/>
					</div>
				</div>
			</div>
		</div>
	)
}