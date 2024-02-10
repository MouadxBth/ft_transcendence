import { Dispatch, Reducer, SetStateAction, useEffect } from "react";
import useSockets from "../../socket/useSockets";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { ChannelType } from "@/lib/types/chat/channel/channel";
import { toast } from "sonner";
import { formattedDate } from "@/lib/utils";
import { ChannelsAction } from "./useChannelsState";

const ChannelData = ({
	name,
	createdAt,
	topic,
	message,
}: {
	name: string;
	createdAt: string;
	topic: string | null;
	message: string;
}) => {
	return (
		<div className="flex flex-col">
			<div className="text-xs">{formattedDate(createdAt)}</div>
			<div className="pt-2 pb-1">{name}</div>
			<div className="text-xs">{topic ? topic : ""}</div>
			<div className="text-xs">{message}</div>
		</div>
	);
};

const useChannelsUpdate = (channelsDispatch: Dispatch<ChannelsAction>) => {
	const { authenticatedUser } = useAuthentication();
	const { channels } = useSockets();

	useEffect(() => {
		channels?.on("channel_created", (args: ChannelType) => {
			console.log("CALLED HERE§!!", args);
			toast.success("Channels", {
				description: (
					<ChannelData
						name={args.name}
						createdAt={args.createdAt}
						topic={args.topic}
						message="Channel successfully created!"
					/>
				),
			});

			// channelsDispatch({
			// 	type: "ADD_CHANNEL",
			// 	payload: args,
			// });
		});

		channels?.on("channel_deleted", (args: ChannelType) => {
			toast.warning("Channels", {
				description: (
					<ChannelData
						name={args.name}
						createdAt={args.createdAt}
						topic={args.topic}
						message="Channel successfully deleted!"
					/>
				),
			});

			channelsDispatch({
				type: "REMOVE_CHANNEL",
				payload: args,
			});
		});
	}, [channels, authenticatedUser, channelsDispatch]);
};

export default useChannelsUpdate;
