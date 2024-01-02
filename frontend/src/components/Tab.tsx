export default function Tab(props: {value: string, active: boolean, handler: (a: string) => void}) {

	if (props.active == true)
		return (
			<div onClick={()=> props.handler(props.value)} className="flex basis-1/2 justify-center bg-gray-500 p-5 border-b-4 border-black">
			<h2>{props.value}</h2>
		</div>
		)
	else
	 return (
		<div onClick={()=> props.handler(props.value)} className="flex basis-1/2 justify-center p-5">
		<h2>{props.value}</h2>
	</div>
	 )
}