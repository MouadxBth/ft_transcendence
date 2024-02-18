"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";
import { ChannelJoinFormType, channelJoinFormSchema } from "@/lib/types/form/channel-join-form";
import ChannelFind from "./ChannelInvited";

const ChannelInvitedForm = () => {
	const { channels } = useSockets();

	const form = useForm<ChannelJoinFormType>({
		resolver: zodResolver(channelJoinFormSchema),
	});

	function onSubmit(data: ChannelJoinFormType) {
		channels?.emit("join_channel", {
			channel: data.channel,
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<FormField
					control={form.control}
					name="channel"
					render={({ field }) => (
						<ChannelFind
							field={field}
							form={form}
						/>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default ChannelInvitedForm;
