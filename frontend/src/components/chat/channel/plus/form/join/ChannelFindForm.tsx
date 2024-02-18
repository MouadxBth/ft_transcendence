"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";
import { ChannelJoinFormType, channelJoinFormSchema } from "@/lib/types/form/channel-join-form";
import ChannelFind from "./ChannelFind";
import { useState } from "react";
import GenericFormField from "@/components/generic/GenericFormField";

const ChannelFindForm = () => {
	const { channels } = useSockets();
	const [requiresPassword, setRequiresPassword] = useState(false);

	const form = useForm<ChannelJoinFormType>({
		resolver: zodResolver(channelJoinFormSchema),
		defaultValues: {
			password: requiresPassword ? "" : undefined,
		},
	});

	function onSubmit(data: ChannelJoinFormType) {
		channels?.emit("join_channel", {
			channel: data.channel,
			password: data.password,
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
							setRequiresPassword={setRequiresPassword}
						/>
					)}
				/>
				{requiresPassword && (
					<GenericFormField
						control={form.control}
						name="password"
						placeholder="Enter the channel's password."
						label="Password"
						type="password"
					/>
				)}
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default ChannelFindForm;
