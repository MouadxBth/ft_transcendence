import Link from "next/link";
import { cn, formattedDate, getStatusColor } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export interface ChannelTabListItemProps {
	name: string;
	active: boolean;
	topic: string | null;
	date: string;
	members: number;
	status: string;
}

const ChannelTabListItem = ({
	name,
	active,
	topic,
	date,
	members,
	status,
}: ChannelTabListItemProps) => {
	return (
		<>
			<Link
				href={`/chat/channel/${name}`}
				className={cn("p-4 bg-black flex space-x-2", {
					"bg-secondary": active,
				})}
			>
				<Avatar>
					<AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
				</Avatar>

				<div className="flex flex-col w-full">
					<div className=" w-full flex justify-between break-all whitespace-pre-wrap">
						<div className=" w-1/2 ">{name}</div>
						<div className="text-xs text-muted-foreground text-end">{formattedDate(date)}</div>
					</div>
					<div className="text-xs text-muted-foreground flex items-start space-x-2 justify-between break-words whitespace-pre-wrap">
						<div className=" basis-8/12">{`${topic ? topic : "No Topic"}`}</div>
						<div className="flex flex-col basis-4/12">
							<div className="basis-1/2 ">
								{`Members:`} <span className="text-amber-500">{members}</span>
							</div>
							<div className={cn("basis-1/2 text-blue-500", getStatusColor(status))}>{status}</div>
						</div>
					</div>
				</div>
			</Link>
			<Separator className="border" />
		</>
	);
};

export default ChannelTabListItem;
