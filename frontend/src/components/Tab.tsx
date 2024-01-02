export default function Tab(props: {value: string, active: boolean, handler: (a: string) => void}) {

	if (props.active == true)
		return (
		<div onClick={()=> props.handler(props.value)} className="flex flex-col w-full h-full basis-1/2 justify-center bg-gray-500">
			<div>
				<h2 className="text-center">{props.value}</h2>
			</div>
		</div>
		)
	else
	 return (
		<div onClick={()=> props.handler(props.value)} className="h-full flex flex-col w-full basis-1/2 justify-center">
			<div>
				<h2 className="text-center">{props.value}</h2>
			</div>
		</div>
	 )
}