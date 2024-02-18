import { FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover } from "@/components/ui/popover";
import ChannelFindTrigger from "./ChannelFindTrigger";
import ChannelFindContent from "./ChannelFindContent";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { ChannelJoinFormType } from "@/lib/types/form/channel-join-form";
import { Dispatch, SetStateAction } from "react";

export interface ChannelFindProps {
	field: ControllerRenderProps<ChannelJoinFormType, "channel">;
	form: UseFormReturn<ChannelJoinFormType, any, ChannelJoinFormType>;
	setRequiresPassword: Dispatch<SetStateAction<boolean>>;
}

const ChannelFind = ({ field, form, setRequiresPassword }: ChannelFindProps) => {
	return (
		<FormItem className="flex flex-col">
			<FormLabel>Channel</FormLabel>
			<Popover>
				<ChannelFindTrigger name={field.value} />
				<ChannelFindContent
					selected={field.value}
					select={(name, status) => {
						form.setValue("channel", name);
						setRequiresPassword(status === "PROTECTED");
					}}
				/>
			</Popover>
			<FormDescription>Look for any channel to join!</FormDescription>
			<FormMessage />
		</FormItem>
	);
};

export default ChannelFind;
