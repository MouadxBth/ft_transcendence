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
import { createChannel, fetchChannelDirectMessages } from "@/lib/chat/channel/channel-service-endpoints"
import { AxiosError } from "axios"
import { toastError } from "@/lib/error-handling/toast-error"
import { useContext } from "react"
import { useChannelContext } from "@/hooks/useChannelContext"
import { createChannelItem } from "@/lib/chat/utils"
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser"

const FormSchema = z.object({
	name: z
		.string(),
	topic: z
		.string()
		.optional(),
	status: z
		.enum(["PRIVATE", "PUBLIC", "PROTECTED"], {
			required_error: "PLEASE SELECT A VALUE!!"
		}),
	password: z
		.string().optional()
	})

export type CreateChannelDto = z.infer<typeof FormSchema>;

const JoinChannelForm = () => {
	
	const { channelData, setChannelData } = useChannelContext();
	const {data: userData} = useAuthenticatedUser();

	const form = useForm<CreateChannelDto>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			status: "PUBLIC"
		}
	})

	async function onSubmit(data: CreateChannelDto) {
		
		console.log("submitted data");
		
		try {
			
			const res = await createChannel(data);
			const chan = await createChannelItem(data.name, userData?.user.username!);
			channelData.push(chan);
			setChannelData([...channelData]);
			
			toast({
				title: "Created channel with following attributes",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">{JSON.stringify(res, null, 2)}</code>
					</pre>
				),
			})		
		} catch (e) {
			toastError(e);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="name"
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
					name="topic"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder="Topic"
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
					name="status"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Type</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={"PUBLIC"}
									className="flex flex-col space-y-1"
								>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="PUBLIC" />
										</FormControl>
										<FormLabel className="font-normal">
											Public
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="PRIVATE" />
										</FormControl>
										<FormLabel className="font-normal">
											Private
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="PROTECTED" />
										</FormControl>
										<FormLabel className="font-normal">
											Protected
										</FormLabel>
									</FormItem>
								</RadioGroup>
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
									placeholder="Password (Optional)"
									className="resize-none"
									{...field}
									value={field.value!}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-row justify-center">
				<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	)
}

export default JoinChannelForm;
