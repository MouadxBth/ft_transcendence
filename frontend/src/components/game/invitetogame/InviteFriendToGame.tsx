"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import SelectModeField from "../components/GameMatchmaking/SelectModeField";
import InvitedFriendItem from "./InvitedFriendItem";

const FormSchema = z.object({
	mode: z.string().default("classic").optional(),
	invite: z
		.string({
			required_error: "Please select a language.",
		})
		.optional()
		.default(""),
});

export interface InviteFriendToGameProps {
	invitedFriend: any;
}
const InviteFriendToGame = ({ invitedFriend }: InviteFriendToGameProps) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			mode: "classicmode",
			invite: invitedFriend.nickname,
		},
	});
	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 flex flex-col items-center justify-center w-full h-full"
			>
				<SelectModeField form={form} />
				<InvitedFriendItem
					value={invitedFriend.nickname}
					friend={invitedFriend}
				/>
				<Button
					type="submit"
					className="w-40"
				>
					Go !
				</Button>
			</form>
		</Form>
	);
};

export default InviteFriendToGame;
