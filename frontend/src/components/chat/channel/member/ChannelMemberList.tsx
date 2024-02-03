import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useChannelContext } from "@/hooks/useChannelContext";
import { findChannelItem } from "@/lib/chat/utils";
import ChannelMemberListItem from "./ChannelMemberListItem";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChannelMemberList = ({setMemberListOpen, name} : {setMemberListOpen: (arg: boolean) => void, name: string}) => {

	const { channelData } = useChannelContext();
	const { members } = findChannelItem(name, channelData)!
	
	return (
		<Dialog open onOpenChange={() => setMemberListOpen(false)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center"> Members </DialogTitle>
					<DialogDescription>
						<ScrollArea className="h-[40vh]">
							{
								members.map((item) => {
									return (
										<ChannelMemberListItem channel={name}  avatar="" username={item.userId} />
									)
								})
							}
						</ScrollArea>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default ChannelMemberList;