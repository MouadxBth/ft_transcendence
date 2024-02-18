import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CommandItem } from "@/components/ui/command";
import { ChannelType } from "@/lib/types/channel/channel";
import { cn, formattedDate, getStatusColor } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

export interface ChannelFindListItemProps {
	channel: ChannelType;
	select: (value: string, status: string) => void;
	selected: string;
}

const ChannelFindListItem = ({ channel, select, selected }: ChannelFindListItemProps) => {
	const { name, topic, status, members, createdAt } = channel;
	return (
		<CommandItem
			value={name}
			onSelect={() => select(name, channel.status)}
			className="w-full "
		>
			<Check className={cn("mr-1 h-3 w-3", name === selected ? "opacity-100" : "opacity-0")} />

			<Avatar>
				<AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
			</Avatar>

			<div className="pl-1 flex flex-col w-full">
				<div className=" w-full flex justify-between break-all whitespace-pre-wrap">
					<div className=" w-1/2 ">{name}</div>
					<div className="text-xs text-muted-foreground text-end">{formattedDate(createdAt)}</div>
				</div>
				<div className="text-xs text-muted-foreground flex items-start space-x-2 justify-between break-words whitespace-pre-wrap">
					<div className=" basis-8/12">{`${topic ? topic : "No Topic"}`}</div>
					<div className="flex flex-col basis-4/12">
						<div className="basis-1/2 ">
							{`Members:`} <span className="text-amber-500">{members.length}</span>
						</div>
						<div className={cn("basis-1/2", getStatusColor(status))}>{status}</div>
					</div>
				</div>
			</div>
		</CommandItem>
	);
};

export default ChannelFindListItem;
