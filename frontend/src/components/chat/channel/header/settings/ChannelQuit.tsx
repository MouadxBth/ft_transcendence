import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";
import { DoorOpen } from "lucide-react";

export interface ChannelQuitProps {
	name: string;
	className?: string;
}

const ChannelQuit = ({ name, className }: ChannelQuitProps) => {
	const { channels } = useSockets();

	return (
		<Button
			variant="outline"
			className={className}
			onClick={() => {
				channels?.emit("leave_channel", name);
			}}
		>
			<DoorOpen className="mr-2 h-4 w-4" />
			<span>Exit</span>
		</Button>
	);
};

export default ChannelQuit;
