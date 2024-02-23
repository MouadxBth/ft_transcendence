"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { GameRequestType } from "@/lib/types/game/game-request";
import useReceivedGameRequests from "@/hooks/game/request/useReceivedGameRequests";
import ReceivedRequestSelectionListItem from "./ReceivedRequestSelectionListItem";

export interface ReceivedRequestSelectionListProps {
	select: (value: string) => void;
	selected: string | undefined;
}

const ReceivedRequestSelectionList = ({ selected, select }: ReceivedRequestSelectionListProps) => {
	const { data, isLoading, isSuccess, isError, error } = useReceivedGameRequests();
	const [requests, setRequests] = useState<GameRequestType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			return;
		}

		if (data) setRequests(data);
		setLoading(false);
	}, [data, isLoading, isError, isSuccess, error]);

	if (loading) return <div className="text-center">Loading...</div>;

	if (!requests.length) return <div className="text-center">You have no game requests yet!</div>;

	return (
		<ScrollArea className=" w-full">
			<div className="w-full h-24 pr-3">
				{requests.map((request) => (
					<ReceivedRequestSelectionListItem
						key={request.sender.username}
						request={request}
						selected={selected}
						select={select}
					/>
				))}
			</div>
		</ScrollArea>
	);
};

export default ReceivedRequestSelectionList;
