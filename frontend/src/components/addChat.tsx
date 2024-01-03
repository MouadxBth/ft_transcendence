import { loggedUser } from "@/app/chat/userData";
import { Plus, Send, UserPlus } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "@/app/chat/userContext";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";
  

function AddChat() {
	const {userData, setUserData} = useContext(userContext);
	const {reset, handleSubmit, register}= useForm<{username: string}>({
		defaultValues: {
			username: ""
		},
	})

	function onSubmit(value: {username: string}, e: any) {
		if (value.username.trim() && value.username.trim() !== '') {
			const userExists = userData.conversations.some(
				conversation => conversation.user === value.username.trim()
			);
		if (!userExists)
		{
			userData.conversations.push({user: value.username.trim(), data: []})
			setUserData({...userData})
		}
	}
	e.target.reset()
}
	
   return(
    <>
        <div>
			<Dialog>
				<DialogTrigger className=" rounded-full h-10 w-10 bg-white text-black absolute top-[93%] right-[81%]">
					<div className="flex justify-center">
						<Plus/>
					</div>
				</DialogTrigger>
				<DialogContent className="flex flex-col text-white">
				<DialogTitle >Enter username</DialogTitle>
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
						<input className="bg-black w-full h-full border rounded-full px-2" placeholder="username" type="text" {...register("username")}/>
								<DialogFooter>
									<Button variant="ghost" className="mt-4" type="submit">
										<UserPlus />
									</Button>
								</DialogFooter>
								<DialogClose className="text-white"></DialogClose>
					</form>
				</DialogContent>
			</Dialog>
        </div>
    </>
   )
   }
  export default AddChat