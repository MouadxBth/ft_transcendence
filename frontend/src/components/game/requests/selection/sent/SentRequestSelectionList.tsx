"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { GameRequestType } from "@/lib/types/game/game-request";
import useSentGameRequests from "@/hooks/game/request/useSentGameRequests";
import SentRequestSelectionListItem from "./SentRequestSelectionListItem";

export interface SentRequestSelectionListProps {
	select: (value: string) => void;
	selected: string | undefined;
}

const SentRequestSelectionList = ({ selected, select }: SentRequestSelectionListProps) => {
	const { data, isLoading, isSuccess, isError, error } = useSentGameRequests();
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

	if (!requests.length)
		return <div className="text-center">You haven&apos;t sent any game requests yet!</div>;

	return (
		<ScrollArea className=" w-full">
			<div className="w-full h-24 pr-3">
				{requests.map((request) => (
					<SentRequestSelectionListItem
						key={request.player1.username}
						request={request}
						selected={selected}
						select={select}
					/>
				))}
			</div>
		</ScrollArea>
	);
};

export default SentRequestSelectionList;
