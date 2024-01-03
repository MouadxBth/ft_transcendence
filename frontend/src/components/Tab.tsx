export default function Tab(props: {value: string, active: boolean, handler: (a: string) => void}) {

	if (props.active == true)
		return (
		<div onClick={()=> props.handler(props.value)} className="flex flex-col w-full h-20 basis-1/2 justify-center text-white border-b-4 bg-black">
			<div>
				<h2 className="text-center">{props.value}</h2>
			</div>
		</div>
		)
	else
	 return (
		<div onClick={()=> props.handler(props.value)} className="h-20 flex flex-col w-full basis-1/2 justify-center text-white/20 hover:text-gray-500/70 cursor-pointer">
			<div>
				<h2 className="text-center">{props.value}</h2>
			</div>
		</div>
	 )
}