import { StringToBoolean } from "class-variance-authority/types";

export default function SingleMessage(props: {message: string, other: Boolean}) {
	if (props.other)
		return (
			<div className="flex flex-row justify-end w-full my-1">
				<div className="text-white bg-gray-800 px-4 py-2 rounded-full">
					<h4>{props.message}</h4>
				</div>
			</div>
		)
	else
		return (
			<div className="flex flex-row justify-start w-full my-1 rounded-full">
				<div className="text-white bg-gray-800 px-4 py-2  rounded-full">
					<h4>{props.message}</h4>
				</div>
			</div>
		)
}