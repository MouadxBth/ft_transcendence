"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";
import { Button } from "@/components/ui/button";
import { ChannelFormProtectedField } from "./ChannelFormProtectedField copy";

import { z } from "zod";

export const channelFormProtectedSchema = z.object({
	name: z
		.string()
		.min(3)
		.max(50)
		.refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
			message:
				"Name must only contain alphabets and numbers with no whitespaces or special characters",
		}),
	password: z.string().min(8).max(50),
	topic: z.string().optional(),
	status: z.string().default("PROTECTED").optional(),
});

export type ChannelFormProtectedType = z.infer<typeof channelFormProtectedSchema>;

const ChannelFormProtected = () => {
	const { channels } = useSockets();

	const form = useForm<ChannelFormProtectedType>({
		resolver: zodResolver(channelFormProtectedSchema),
		defaultValues: {
			name: "",
			status: "PROTECTED",
			password: "",
		},
	});

	async function onSubmit(data: ChannelFormProtectedType) {
		channels?.emit("create_channel", data);
	}

	return (
		<Form {...form}>
			<form
				id="channel"
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 max-sm:grid-cols-1 gap-y-4 gap-x-2 pb-4"
			>
				<ChannelFormProtectedField
					control={form.control}
					name="name"
					placeholder="Enter a good unique name."
					label="Name"
					type="text"
				/>

				<ChannelFormProtectedField
					control={form.control}
					name="password"
					placeholder="Enter a strong password."
					label="Password"
					type="password"
				/>

				<ChannelFormProtectedField
					control={form.control}
					name="topic"
					placeholder="Enter a channel topic."
					label="Topic"
					type="text"
					className="col-span-2"
				/>
			</form>
			<Button
				type="submit"
				form="channel"
				variant="outline"
			>
				Submit
			</Button>
		</Form>
	);
};

export default ChannelFormProtected;
