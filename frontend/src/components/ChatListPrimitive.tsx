import { ScrollArea } from "./ui/scroll-area";

export default function ChatListPrimitive({children} : {children: React.ReactNode}) {
	return (
		<ScrollArea className="h-screen">
			<div className="h-full w-full">
				{children}
			</div>
		</ScrollArea>
	)
}