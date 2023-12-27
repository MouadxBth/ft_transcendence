import Image from "next/image";
import { Input } from "./ui/input";


export default function SendBar() {
	return (
		<div className="flex flex-row bg-white w-full h-23">
			<div className="basis-3/4 flex flex-col justify-center p-2">
				<Input placeholder="send a text message"/>
			</div>
			<div className="basis-1/4 flex flex-col justify-center">
				<div className="flex justify-end p-3">
					<div>
						<Image src="/img/send-arrow.png" alt="a generic image of a user profile" width={30} height={30}/>
					</div>
				</div>
			</div>
		</div>
	)
}