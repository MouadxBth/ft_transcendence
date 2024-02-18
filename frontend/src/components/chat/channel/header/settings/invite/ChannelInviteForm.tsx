"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";

import GenericFormField from "@/components/generic/GenericFormField";
import {
	ChannelOperationFormType,
	channelOperationFormSchema,
} from "@/lib/types/form/channel-operation";

export interface ChannelInviteFormProps {
	name: string;
}

const ChannelInviteForm = ({ name }: ChannelInviteFormProps) => {
	const { channels } = useSockets();

	const form = useForm<ChannelOperationFormType>({
		resolver: zodResolver(channelOperationFormSchema),
		defaultValues: {
			nickname: "",
		},
	});

	function onSubmit(data: ChannelOperationFormType) {
		channels?.emit("invite_to_channel", {
			member: data.nickname,
			channel: name,
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 space-y-6"
			>
				<GenericFormField
					className="col-span-2"
					control={form.control}
					name="nickname"
					placeholder="Enter the target's nickname."
					label="Nickname"
					type="text"
					description="Invite a user to your private channel:"
				/>

				<Button
					className=" col-start-2 col-span-1"
					type="submit"
					variant="outline"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default ChannelInviteForm;
