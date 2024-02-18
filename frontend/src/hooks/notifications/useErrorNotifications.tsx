import { useEffect } from "react";
import { useAuthentication } from "../authentication/useAuthentication";
import useSockets from "../socket/useSockets";
import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/lib/types/error";

const useErrorNotifications = () => {
	const { authenticatedUser } = useAuthentication();
	const { notifications, conversations, channels } = useSockets();
	const { toast } = useToast();

	useEffect(() => {
		notifications?.on("error", (args: ErrorType) => {
			if (args.authenticatedUser.user.username === authenticatedUser?.user.username) {
				toast({
					title: "Error",
					variant: "destructive",
					description: `${args.message}`,
				});
			}
		});

		conversations?.on("error", (args: ErrorType) => {
			if (args.authenticatedUser.user.username === authenticatedUser?.user.username) {
				toast({
					title: "Error | Conversations",
					variant: "destructive",
					description: `${args.message}`,
				});
			}
		});

		channels?.on("error", (args: ErrorType) => {
			if (args.authenticatedUser.user.username === authenticatedUser?.user.username) {
				toast({
					title: "Error | Channels",
					variant: "destructive",
					description: `${args.message}`,
				});
			}
		});
	}, [notifications, conversations, channels, authenticatedUser, toast]);
};

export default useErrorNotifications;
