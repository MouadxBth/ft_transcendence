'use client'
import { useState } from "react"

export default function InputField(props: {className?: string, label: string, type: string, inputStyle?: string}) {
	return (
		<div className={props.className}>
			<input className={`form-input ${props.inputStyle}`} id={props.label} placeholder={props.label} type={props.type}/>
		</div>
	)
}