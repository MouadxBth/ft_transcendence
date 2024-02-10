"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";
import { ChannelFormField } from "./ChannelFormField";
import { Button } from "@/components/ui/button";

import { z } from "zod";

export const channelFormPublicSchema = z.object({
	name: z
		.string()
		.min(3)
		.max(50)
		.refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
			message:
				"Name must only contain alphabets and numbers with no whitespaces or special characters",
		}),
	topic: z.string().optional(),
	status: z.string().default("PUBLIC").optional(),
});

export type ChannelFormPublicType = z.infer<typeof channelFormPublicSchema>;

const ChannelFormPublic = () => {
	const { channels } = useSockets();

	const form = useForm<ChannelFormPublicType>({
		resolver: zodResolver(channelFormPublicSchema),
		defaultValues: {
			name: "",
		},
	});

	async function onSubmit(data: ChannelFormPublicType) {
		channels?.emit("create_channel", data);
	}

	return (
		<Form {...form}>
			<form
				id="channel"
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<ChannelFormField
					control={form.control}
					name="name"
					placeholder="Enter a good unique name."
					label="Name"
					type="text"
				/>

				<ChannelFormField
					control={form.control}
					name="topic"
					placeholder="Enter a channel topic."
					label="Topic"
					type="text"
				/>

				<Button
					type="submit"
					form="channel"
					variant="outline"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default ChannelFormPublic;