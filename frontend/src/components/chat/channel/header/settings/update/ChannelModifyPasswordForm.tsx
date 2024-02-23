"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";

import GenericFormField from "@/components/generic/GenericFormField";
import { ChannelType } from "@/lib/types/channel/channel";
import {
	ChannelPasswordOperationFormType,
	channelPasswordOperationFormSchema,
} from "@/lib/types/form/channel-password-operation";

export interface ChannelModifyPasswordFormProps {
	channel: ChannelType;
}

const ChannelModifyPasswordForm = ({ channel }: ChannelModifyPasswordFormProps) => {
	const { channels } = useSockets();

	const form = useForm<ChannelPasswordOperationFormType>({
		resolver: zodResolver(channelPasswordOperationFormSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	function onSubmit(data: ChannelPasswordOperationFormType) {
		channels?.emit("modify_channel_password", {
			password: data.password,
			channel: channel.name,
		});
		form.reset();
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
					name="password"
					placeholder="Enter the target's nickname."
					label="Password"
					type="password"
					description="Kick a member if he's being annoying:"
				/>

				<GenericFormField
					className="col-span-2"
					control={form.control}
					name="confirmPassword"
					placeholder="Enter the target's nickname."
					label="Confirm Password"
					type="password"
					description="Kick a member if he's being annoying:"
				/>

				<Button
					className="col-start-2 col-span-1"
					type="submit"
					variant="outline"
					disabled={channel.status === "PUBLIC" || channel.status === "PRIVATE"}
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default ChannelModifyPasswordForm;
