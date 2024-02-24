"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";

import GenericFormField from "@/components/generic/GenericFormField";
import { channelOperationFormSchema } from "@/lib/types/form/channel-operation";
import {
	ChannelPasswordOperationFormType,
	channelPasswordOperationFormSchema,
} from "@/lib/types/form/channel-password-operation";
import { ChannelType } from "@/lib/types/channel/channel";

export interface ChannelAddPasswordFormProps {
	channel: ChannelType;
}

const ChannelAddPasswordForm = ({ channel }: ChannelAddPasswordFormProps) => {
	const { channels } = useSockets();

	const form = useForm<ChannelPasswordOperationFormType>({
		resolver: zodResolver(channelPasswordOperationFormSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	function onSubmit(data: ChannelPasswordOperationFormType) {
		channels?.emit("add_channel_password", {
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
					placeholder="Enter a good strong password"
					label="Password"
					type="password"
					description="Protect your channel with a password:"
				/>

				<GenericFormField
					className="col-span-2"
					control={form.control}
					name="confirmPassword"
					placeholder="Confirm your password."
					label="Confirm Password"
					type="password"
					description="Confirm your password:"
				/>

				<Button
					className="col-start-2 col-span-1"
					type="submit"
					variant="outline"
					disabled={channel.status === "PROTECTED" || channel.status === "PRIVATE"}
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default ChannelAddPasswordForm;
