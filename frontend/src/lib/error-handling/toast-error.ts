import { toast } from "@/components/ui/use-toast"
import { AxiosError } from "axios"

export const toastError = (e?: unknown) => {
	if (e instanceof AxiosError) {
		toast({
			variant: "destructive",
			title: e.name,
			description: JSON.stringify(e.response?.data)
		})
	}
	else if (e instanceof Error) {
		toast({
			variant: "destructive",
			title: e.name,
			description: e.message
		})
	}
	else {
		toast({
			variant: "destructive",
			title: "Unknown error occured",
		})
	}
}