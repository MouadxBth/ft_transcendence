import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formattedDate, getStatusColor } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { ChannelJoinFormType } from "../ChannelJoinSearch";
import useChannels from "@/hooks/chat/channel/useChannels";
import { ChannelType } from "@/lib/types/chat/channel/channel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Trigger = ({ field, channels }: ListProps) => {
	return (
		<PopoverTrigger asChild>
			<FormControl>
				<Button
					variant="outline"
					role="combobox"
					className={cn(" justify-between", !field.value && "text-muted-foreground")}
				>
					{field.value
						? channels.find((channel) => channel.name === field.value)?.name
						: "Select language"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</FormControl>
		</PopoverTrigger>
	);
};

export interface ListProps {
	field: ControllerRenderProps<ChannelJoinFormType, "channel">;
	form: UseFormReturn<ChannelJoinFormType, any, undefined>;
	channels: ChannelType[];
}

const List = ({ field, form, channels }: ListProps) => {
	return (
		<ScrollArea className="h-24 pr-3 w-full">
			{channels.map(({ name, createdAt, status, members, topic }) => (
				<CommandItem
					key={name}
					value={name}
					onSelect={() => {
						form.setValue("channel", name);
					}}
					className="w-full "
				>
					<Check
						className={cn("mr-1 h-3 w-3", name === field.value ? "opacity-100" : "opacity-0")}
					/>
					<Avatar>
						<AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
					</Avatar>

					<div className="pl-1 flex flex-col w-full">
						<div className=" w-full flex justify-between break-all whitespace-pre-wrap">
							<div className=" w-1/2 ">{name}</div>
							<div className="text-xs text-muted-foreground text-end">
								{formattedDate(createdAt)}
							</div>
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
			))}
		</ScrollArea>
	);
};

const Content = ({ field, form, channels }: ListProps) => {
	return (
		<PopoverContent className="w-[400px] p-0">
			<Command>
				<CommandInput placeholder="Search channel..." />
				<CommandEmpty>No channel found.</CommandEmpty>
				<CommandGroup>
					<List
						field={field}
						form={form}
						channels={channels}
					/>
				</CommandGroup>
			</Command>
		</PopoverContent>
	);
};

export interface ChannelJoinFormItemProps {
	field: ControllerRenderProps<ChannelJoinFormType, "channel">;
	form: UseFormReturn<ChannelJoinFormType, any, undefined>;
}

const ChannelJoinFormItem = (props: ChannelJoinFormItemProps) => {
	const { data, isLoading } = useChannels();
	const [channels, setChannels] = useState<ChannelType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isLoading) return;

		setLoading(false);

		if (!data) return;

		setChannels(data);
	}, [isLoading, data]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<FormItem className="flex flex-col">
			<FormLabel>Channel</FormLabel>
			<Popover>
				<Trigger
					{...props}
					channels={channels}
				/>
				<Content
					{...props}
					channels={channels}
				/>
			</Popover>
			<FormDescription>Look for any channel to join!</FormDescription>
			<FormMessage />
		</FormItem>
	);
};

export default ChannelJoinFormItem;
