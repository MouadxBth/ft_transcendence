"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";

import GenericFormField from "@/components/generic/GenericFormField";
import {
	ChannelMuteOperationFormType,
	channelMuteOperationFormSchema,
} from "@/lib/types/form/channel-operation";

export interface ChannelMuteFormProps {
	name: string;
}

const ChannelMuteForm = ({ name }: ChannelMuteFormProps) => {
	const { channels } = useSockets();

	const form = useForm<ChannelMuteOperationFormType>({
		resolver: zodResolver(channelMuteOperationFormSchema),
		defaultValues: {
			nickname: "",
		},
	});

	function onSubmit(data: ChannelMuteOperationFormType) {
		channels?.emit("mute_on_channel", {
			member: data.nickname,
			channel: name,
			duration: Number.parseInt(data.duration),
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-2"
			>
				<GenericFormField
					className="col-span-2"
					control={form.control}
					name="nickname"
					placeholder="Enter the target's nickname."
					label="Nickname"
					type="text"
					description="Mute a member, if they talk too much:"
				/>

				<GenericFormField
					className="col-span-2"
					control={form.control}
					name="duration"
					placeholder="Enter the duration as an integer."
					label="Duration"
					type="text"
					description="Duration in seconds, the longer, the better:"
				/>

				<Button
					className="col-start-2 col-span-1"
					type="submit"
					variant="outline"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default ChannelMuteForm;
