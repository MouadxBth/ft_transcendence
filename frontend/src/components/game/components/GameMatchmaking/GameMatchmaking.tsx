"use client";
import MatchmakingTitle from "./MatchmakingTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, FieldValue, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import SelectModeField from "./SelectModeField";
import SelectRankedField from "./SelectRankedField";
import InviteField from "./InviteField";

const FormSchema = z.object({
	mode: z.string().default("classic").optional(),
	ranked: z.boolean().default(false).optional(),
	invite: z
		.string({
			required_error: "Please select a language.",
		})
		.optional()
		.default(""),
});
export interface Matchmakingprops {
	form: UseFormReturn<FieldValue<any>>;
}

const GameMatchmaking = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			mode: "classicmode",
			ranked: false,
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
		<ScrollArea className="w-full h-full flex items-center justify-center">
			<MatchmakingTitle />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 flex flex-col items-center justify-center"
				>
					<SelectModeField form={form} />
					<SelectRankedField form={form} />
					<InviteField form={form} />
					<Button
						type="submit"
						className="w-1/4"
					>
						Go !
					</Button>
				</form>
			</Form>
		</ScrollArea>
	);
};

export default GameMatchmaking;
