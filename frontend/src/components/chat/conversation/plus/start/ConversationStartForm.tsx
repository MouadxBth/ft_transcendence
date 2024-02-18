"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";

import GenericFormField from "@/components/generic/GenericFormField";
import { ConversationFormType, conversationFormSchema } from "@/lib/types/form/conversation-form";

export interface ConversationStartFormProps {
	className?: string;
}

const ConversationStartForm = ({ className }: ConversationStartFormProps) => {
	const { conversations } = useSockets();

	const form = useForm<ConversationFormType>({
		resolver: zodResolver(conversationFormSchema),
		defaultValues: {
			target: "",
		},
	});

	function onSubmit(data: ConversationFormType) {
		conversations?.emit("create_conversation", data.target);
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
					name="target"
					placeholder="Search with the target's nickname..."
					label="Nickname"
					type="text"
					description="Start a conversation with anyone you want:"
				/>

				<Button
					className="col-start-2 col-span-1"
					type="submit"
					variant="outline"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default ConversationStartForm;
