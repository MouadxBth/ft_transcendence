import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useAuthentication } from "../../authentication/useAuthentication";
import useSockets from "../../socket/useSockets";
import { BlockStatusType } from "@/lib/types/block/block-status";

const useBlockUpdate = (
	target: string,
	setStatus: React.Dispatch<React.SetStateAction<BlockStatusType | undefined>>
) => {
	const { authenticatedUser } = useAuthentication();
	const { notifications } = useSockets();
	const { toast } = useToast();

	useEffect(() => {
		const handleBlock = (args: BlockStatusType) => {
			if (authenticatedUser?.user.username === args.senderId && args.targetId === target) {
				setStatus(args);
			}
		};

		notifications?.on("user_blocked", handleBlock);
		notifications?.on("user_unblocked", handleBlock);

		return () => {
			notifications?.off("user_blocked", handleBlock);
			notifications?.off("user_unblocked", handleBlock);
		};
	}, [authenticatedUser, target, setStatus, toast, notifications]);
};

export default useBlockUpdate;
