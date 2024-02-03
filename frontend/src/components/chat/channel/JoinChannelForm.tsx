"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { joinChannel } from "@/lib/chat/channel/channel-service-endpoints"
import { AxiosError } from "axios"
import { toastError } from "@/lib/error-handling/toast-error"
import { useChannelContext } from "@/hooks/useChannelContext"
import { createChannelItem } from "@/lib/chat/utils"

const JoinChannelFormSchema = z.object({
	channel: z
		.string(),
	password: z
		.string().optional()
	})

export type JoinChannelFormType = z.infer<typeof JoinChannelFormSchema>;

const JoinChannelForm = () => {
	
	const {channelData, setChannelData} = useChannelContext();

	const form = useForm<JoinChannelFormType>({
		resolver: zodResolver(JoinChannelFormSchema),
	})

	async function onSubmit(data: JoinChannelFormType) {
		console.log("submitted data");
		try {

			const res = await joinChannel(data);
			
			const chan = await createChannelItem(data.channel);
			channelData.push(chan);
			setChannelData({...channelData});

			toast({
				title: "Created channel with following attributes",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">{JSON.stringify(res, null, 2)}</code>
					</pre>
				),
			})		
		}
		catch (e) {
			toastError(e);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="channel"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder="Name"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder="Password"
									className="resize-none"
									{...field}
									value={field.value!}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}

export default JoinChannelForm;
