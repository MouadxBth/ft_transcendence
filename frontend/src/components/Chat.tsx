import { JSX } from "react"

export default function Chat(props: {children: JSX.Element[] | JSX.Element }) {
	return (
		<div className="w-full h-full">

			{props.children}
		
		</div>
	)
}