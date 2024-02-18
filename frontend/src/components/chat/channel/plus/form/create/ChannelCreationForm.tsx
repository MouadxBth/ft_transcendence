"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";
import { Button } from "@/components/ui/button";
import { ChannelFormType, channelFormSchema } from "@/lib/types/form/channel-form";
import GenericFormField from "@/components/generic/GenericFormField";
import { cn } from "@/lib/utils";

export interface ChannelCreationFormProps {
	type: "public" | "protected" | "private";
}

const ChannelCreationForm = ({ type }: ChannelCreationFormProps) => {
	const { channels } = useSockets();

	const form = useForm<ChannelFormType>({
		resolver: zodResolver(channelFormSchema),
		defaultValues: {
			name: "",
			password: type === "protected" ? "" : undefined,
		},
	});

	async function onSubmit(data: ChannelFormType) {
		channels?.emit("create_channel", {
			...data,
			status: type.toUpperCase(),
		} satisfies ChannelFormType);
	}

	return (
		<Form {...form}>
			<form
				id="channel"
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 max-sm:grid-cols-1 gap-y-4 gap-x-2 pb-4"
			>
				<GenericFormField
					control={form.control}
					name="name"
					placeholder="Enter a good channel name."
					label="Name"
					type="text"
					description="Choose a good channel name:"
					className={cn({
						"col-span-2": type !== "protected",
					})}
				/>

				{type === "protected" && (
					<GenericFormField
						control={form.control}
						name="password"
						placeholder="Enter a strong password."
						label="Password"
						type="password"
						description="Protect your channel:"
					/>
				)}

				<GenericFormField
					control={form.control}
					name="topic"
					placeholder="Enter a channel topic."
					label="Topic"
					type="text"
					className="col-span-2"
					description="Give your channel a purpose, give it a topic:"
				/>

				<Button
					className="col-start-2 col-span-1"
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

export default ChannelCreationForm;
