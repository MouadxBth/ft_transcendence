import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";


export default function chatBar(props: {user: string}) {
	return (
		<div className="flex flex-row border border-gray-500 bg-zinc-900 w-full h-[10%] shrink-0 rounded-2xl text-white">
			<div className="flex-initial h-full shrink-0">
				{/* <div className=""> */}
					<img src="/img/user-black.png" alt="a generic image of a user profile" className="max-w-none h-[100%]"/>
				{/* </div> */}
			</div>
			<div className="flex flex-col justify-center">
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
			<div className="flex flex-row w-full justify-end">
				<div className="flex justify-center flex-col p-3">
					<div>
						<Button>
							<MoreHorizontal className="h-10 w-10"/>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}