"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import ChannelJoinFormItem from "./join/ChannelJoinFormItem";
import useSockets from "@/hooks/socket/useSockets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const channelJoinFormSchema = z.object({
	channel: z.string({
		required_error: "Please select a language.",
	}),
});

export type ChannelJoinFormType = z.infer<typeof channelJoinFormSchema>;

function ChannelJoinFind() {
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
						<ChannelJoinFormItem
							form={form}
							field={field}
						/>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}

const ChannelJoinForm = () => {
	return (
		<Tabs
			defaultValue="find"
			className="w-full"
		>
			<TabsList className="w-full">
				<TabsTrigger value="find">Find</TabsTrigger>
				<TabsTrigger value="invites">Invites</TabsTrigger>
			</TabsList>

			<TabsContent value="find">
				<ChannelJoinFind />
			</TabsContent>
			<TabsContent value="invites">Invites</TabsContent>
		</Tabs>
	);
};

export default ChannelJoinForm;
