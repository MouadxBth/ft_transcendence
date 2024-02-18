import { ChannelsContext } from "@/contexts/ChannelsContext";
import { useContext } from "react";

export const useChannels = () => {
	const context = useContext(ChannelsContext);

	if (!context) throw new Error(`useChannels hook must be used inside an ChannelsContextProvider`);

	return context;
};
