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
import { SendHorizontal } from "lucide-react";

const messageSchema = z.object({
	message: z.string().min(0).max(999),
})

export default function SendBar(props: {user: string, onMessage: any}) {

	const {reset, handleSubmit, register}= useForm<{message: string}>({
		defaultValues: {
			message: ""
		},
	})

	function onSubmit(value: {message: string}, e: any) {
		console.log("form captured");
		console.log(value);
		if (value.message.length)
			props.onMessage(value.message)
			reset({
				message: ""
			})
	}

	return (
		<div className="flex flex-col justify-center w-full">
		<form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="">
		  <div className="flex flex-row">
			<div className="flex flex-col justify-center p-2 w-full">
				<input className="w-full h-14 border rounded-xl px-2 bg-zinc-900 text-white" placeholder={`send a message to ${props.user}`} type="text" {...register("message")}/>
		  </div>
		  <div className="flex flex-col justify-center">
			<div className="flex items-center p-3">
				<Button className="text-white rounded-2xl bg-white/40 border border-white w-14 h-14" type="submit">
					<SendHorizontal size={30} />
				</Button>
			</div>
			</div>
		  </div>
		</form>
	  </div>
	)
}
