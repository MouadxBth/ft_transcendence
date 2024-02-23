"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import SentRequestSelection from "./selection/sent/SentRequestSelection";

export interface GameSentRequestsFormProps {
	className?: string;
}

export const gameSentRequestsFormSchema = z.object({
	sender: z.string({
		required_error: "Please select a request.",
	}),
	accept: z.boolean().optional(),
});

export type GameSentRequestsFormType = z.infer<typeof gameSentRequestsFormSchema>;

const GameSentRequestsForm = ({ className }: GameSentRequestsFormProps) => {
	const { channels } = useSockets();
	const { toast } = useToast();

	const form = useForm<GameSentRequestsFormType>({
		resolver: zodResolver(gameSentRequestsFormSchema),
	});

	function onSubmit(data: GameSentRequestsFormType) {
		toast({
			title: "Here",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
		// channels?.emit("kick_from_channel", {
		// 	member: data.nickname,
		// 	channel: name,
		// });
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
						<SentRequestSelection
							field={field}
							form={form}
							className="col-span-2"
						/>
					)}
				/>

				<Button
					className=" col-start-2 col-span-1"
					type="submit"
					variant="destructive"
				>
					Cancel
				</Button>
			</form>
		</Form>
	);
};

export default GameSentRequestsForm;
