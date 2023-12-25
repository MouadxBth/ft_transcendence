'use client'
import InputField from "./InputField";
import { Button } from "@/components/ui/button"
import axios from 'axios'


export default function Form(props: {label1: string; label2: string; button: string}) {
	
	async function checkLogin(event) {
		event.preventDefault();
		const emailValue = document.getElementById("Email").value;
		const passValue = document.getElementById("Password").value;

		console.log("sending data to API ...")
		console.log(`email: ${emailValue}`)
		console.log(`pass: ${passValue}`)
		const res = await axios.get('/api');
		console.log(`axios response:`);
		console.log(res);
	}

	return (
		<form id='login-form' onSubmit={checkLogin}>
			<div className="p-3">
				<InputField label={props.label1} type="email"/>
			</div>
			<div className="p-3">
				<InputField label={props.label2} type="password"/>
			</div>
			<div className='flex justify-center p-3'>
				<input className="px-10 bg-white text-black \
				hover:text-white hover:bg-black hover:border-solid \
				hover:border-white hover:border-0.5 " type="submit" value="Log in"/>
			</div>
		</form>
	)
}