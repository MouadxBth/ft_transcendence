"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import useSockets from "@/hooks/socket/useSockets";

import { z } from "zod";
import GameMatchmakingOptions from "./GameMatchmakingOptions";
import HorizontalSeparator from "@/components/ui/horizontal-separator";
import UserSelection from "./selection/UserSelection";

export interface GameMatchmakingFormProps {
	name: string;
	defaultSelection?: string;
}

export const gameMatchmakingFormSchema = z.object({
	type: z.enum(["classic", "super"], {
		required_error: "You need to select a game type.",
	}),
	user: z
		.string({
			required_error: "Please select a user.",
		})
		.optional(),
});

export type GameMatchmakingFormType = z.infer<typeof gameMatchmakingFormSchema>;

const GameMatchmakingForm = ({ name, defaultSelection }: GameMatchmakingFormProps) => {
	const { notifications } = useSockets();

	const form = useForm<GameMatchmakingFormType>({
		resolver: zodResolver(gameMatchmakingFormSchema),
		defaultValues: {
			type: "classic",
		},
	});

	function onSubmit(data: GameMatchmakingFormType) {
		if (data.user) {
			return notifications?.emit("send_match_request", {
				target: data.user,
				superMatch: data.type === "super",
			});
		}

		notifications?.emit("join_queue", data.type === "super");
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-4"
			>
				<GameMatchmakingOptions
					form={form}
					className="col-span-2"
				/>

				<HorizontalSeparator
					className="col-span-2 text-xs"
					text="OR"
				/>

				<FormField
					control={form.control}
					name="user"
					render={({ field }) => (
						<UserSelection
							field={field}
							form={form}
							className="col-span-2"
							defaultSelection={defaultSelection}
						/>
					)}
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

export default GameMatchmakingForm;
