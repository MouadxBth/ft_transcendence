import { StringToBoolean } from "class-variance-authority/types";

export default function SingleMessage(props: {message: string, other: Boolean}) {
	if (props.other)
		return (
			<div className="flex flex-row justify-end w-full m-2">
				<div className="border text-white p-2 ">
					<h4>{props.message}</h4>
				</div>
			</div>
		)
	else
		return (
			<div className="flex flex-row justify-start w-full m-2">
				<div className="border text-white p-2 ">
					<h4>{props.message}</h4>
				</div>
			</div>
		)
}