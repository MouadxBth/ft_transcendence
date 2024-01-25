import { Button } from "@/components/ui/button";
import React from "react";

export type FormButtonProps = {
	form: string;
	isPending: boolean;
	children: React.ReactNode;
};

const FormButton = ({ form, isPending, children }: FormButtonProps) => {
	return (
		<div className="pb-2 pt-0 flex items-center justify-center">
			<Button
				type="submit"
				form={form}
				disabled={isPending}
			>
				{children}
			</Button>
		</div>
	);
};

export default FormButton;
