import { FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover } from "@/components/ui/popover";

import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { ChannelJoinFormType } from "@/lib/types/form/channel-join-form";
import { Dispatch, SetStateAction } from "react";
import ChannelInvitedTrigger from "./ChannelInvitedTrigger";
import ChannelInvitedContent from "./ChannelInvitedContent";

export interface ChannelInvitedProps {
	field: ControllerRenderProps<ChannelJoinFormType, "channel">;
	form: UseFormReturn<ChannelJoinFormType, any, ChannelJoinFormType>;
}

const ChannelInvited = ({ field, form }: ChannelInvitedProps) => {
	return (
		<FormItem className="flex flex-col">
			<FormLabel>Channel</FormLabel>
			<Popover>
				<ChannelInvitedTrigger name={field.value} />
				<ChannelInvitedContent
					selected={field.value}
					select={(name) => {
						form.setValue("channel", name);
					}}
				/>
			</Popover>
			<FormDescription>Look for invited channels to join!</FormDescription>
			<FormMessage />
		</FormItem>
	);
};

export default ChannelInvited;
