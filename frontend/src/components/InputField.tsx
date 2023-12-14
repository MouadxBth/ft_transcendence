'use client'
import { useState } from "react"

export default function InputField(props: {label: string, type: string}) {
	return (
		<div className="">
			<input id={props.label} placeholder={props.label} className="form-input" type={props.type}/>
		</div>
	)
}