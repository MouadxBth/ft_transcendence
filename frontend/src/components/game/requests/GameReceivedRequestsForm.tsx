"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ReceivedRequestSelection from "./selection/received/ReceivedRequestSelection";

export interface GameReceivedRequestsFormProps {
	className?: string;
}

export const gameReceivedRequestsFormSchema = z.object({
	sender: z.string({
		required_error: "Please select a request.",
	}),
});

export type GameReceivedRequestsFormType = z.infer<typeof gameReceivedRequestsFormSchema>;

const GameReceivedRequestsForm = ({ className }: GameReceivedRequestsFormProps) => {
	const { notifications } = useSockets();
	const [accepted, setAccepted] = useState(false);

	const form = useForm<GameReceivedRequestsFormType>({
		resolver: zodResolver(gameReceivedRequestsFormSchema),
	});

	function onSubmit(data: GameReceivedRequestsFormType) {
		const event = accepted ? "accept_match_request" : "decline_match_request";
		notifications?.emit(event, data.sender);
		form.reset();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn("grid grid-cols-2 gap-4", className)}
			>
				<FormField
					control={form.control}
					name="sender"
					render={({ field }) => (
						<ReceivedRequestSelection
							field={field}
							form={form}
							className="col-span-2"
						/>
					)}
				/>

				<Button
					className=""
					type="submit"
					variant="destructive"
					name="decline"
					onClick={() => setAccepted(false)}
				>
					Decline
				</Button>

				<Button
					className=""
					type="submit"
					variant="outline"
					onClick={() => setAccepted(true)}
				>
					Accept
				</Button>
			</form>
		</Form>
	);
};

export default GameReceivedRequestsForm;
