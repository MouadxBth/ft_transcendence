'use client'

import Image from "next/image";
import { Input } from "./ui/input";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
  } from "@/components/ui/form"
import { Button } from "./ui/button";
import { useEffect } from "react";

const messageSchema = z.object({
	message: z.string().min(0).max(999),
})

export default function SendBar(props: {user: string, onMessage: any}) {

	const form = useForm<z.infer<typeof messageSchema>>({
		resolver: zodResolver(messageSchema),
		shouldUnregister: true,
		defaultValues: {
			message: ""
		},
	})

	const {reset, resetField} = useForm({
		mode: "onChange",
		defaultValues: {
			message: ""
		},
	})

	function onSubmit(value: z.infer<typeof messageSchema>, e: any) {
		console.log("form captured");
		console.log(value);
		resetField("message");
		props.onMessage(value.message)
		reset({message: ""}, {keepDefaultValues: false});
		value.message = "";
		e.target.reset();
		// useEffect(() => {form.reset()}, [value])
	}

	function handleClick() {
		console.log("time has come");
		resetField("message");
	}

	return (
		<div className="flex flex-col justify-center bg-white w-full h-[10%]">
		<Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="">
		  <div className="flex flex-row">
			<div className="basis-3/4 flex flex-col justify-center p-2">
				<FormField
					control={form.control}
					name="message"
					shouldUnregister={false}
					render={({ field }) => (
					<FormItem>
						<FormControl>
						<Input placeholder="send the user a message" {...field}/>
						</FormControl>
						<FormMessage />
					</FormItem>
					)}
				/>
		  </div>
		  <div className="basis-1/4 flex flex-col justify-center">
			<div className="flex justify-end p-3">
				<button type="submit" onClick={handleClick}/>
				<Button className="text-black" type="submit">
					<Image src="/img/send-arrow.png" alt="a generic image of a user profile" width={30} height={30}/>
				</Button>
			</div>
			</div>
		  </div>
		</form>
	  </Form>
	  </div>
	)
}


// export default function SendBar(props: {user: string, onMessage: () => void}) {
// 	return (
// 		<div className="bg-white w-full h-[10%]">
// 				<MessageForm/>
// 		</div>
// 	)
// }