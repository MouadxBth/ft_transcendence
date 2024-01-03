import { loggedUser } from "@/app/chat/userData";
import { Plus, Send, UserPlus, X } from "lucide-react";
import { useRef, useState } from "react";
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
	const closeBtnRef = useRef(null);
	const {reset, handleSubmit, register}= useForm<{username: string}>({
		defaultValues: {
			username: ""
		},
	})

	function onSubmit(value: {username: string}, e: any) {
		e.preventDefault();
		if (value.username.trim() && value.username.trim() !== '') {
			const userExists = userData.conversations.some(
				conversation => conversation.user === value.username.trim()
			);
		if (!userExists)
		{
			userData.conversations.push({user: value.username.trim(), data: []})
			setUserData({...userData})
			closeBtnRef.current.click();
		}
	}
	reset({
		username: ""
	})
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
					<div className="flex justify-between items-center">
						<DialogTitle >Enter username</DialogTitle>
						<DialogClose ref={closeBtnRef} className="text-white">
							<X/>
						</DialogClose>
					</div>
						<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col justify-between items-center">
							<div>
								<input className="bg-black w-96 h-12 border rounded-full px-2" placeholder="username" type="text" {...register("username")}/>
							</div>
							<div>
								<Button variant="ghost" className="mt-4 hover:bg-white hover:text-black border rounded-xl w-20 h-6 text-white" type="submit">
										Done
									</Button>
							</div>
					</div>
					</form>
				</DialogContent>
			</Dialog>
        </div>
    </>
   )
   }
  export default AddChat