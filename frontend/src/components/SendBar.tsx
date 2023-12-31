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
		e.target.reset()
	}

	return (
		<div className="flex flex-col justify-center bg-white w-full h-[10%]">
		<form onSubmit={handleSubmit(onSubmit)} className="">
		  <div className="flex flex-row">
			<div className="basis-3/4 flex flex-col justify-center p-2">
				<input className="w-full h-full border rounded-full px-2" placeholder={`send a message to ${props.user}`} type="text" {...register("message")}/>
		  </div>
		  <div className="basis-1/4 flex flex-col justify-center">
			<div className="flex justify-end p-3">
				<Button className="text-black" type="submit">
					<Image src="/img/send-arrow.png" alt="a generic image of a user profile" width={30} height={30}/>
				</Button>
			</div>
			</div>
		  </div>
		</form>
	  </div>
	)
}
