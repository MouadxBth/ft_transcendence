"use client";

import { Button } from "@/components/ui/button";
import { ConversationMessageType } from "@/lib/types/conversation/conversation-message";
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult,
} from "@tanstack/react-query";

export interface ConversationMessageLoadMoreProps {
	className?: string;
	hasNextPage: boolean;
	fetchNextPage: (
		options?: FetchNextPageOptions | undefined
	) => Promise<
		InfiniteQueryObserverResult<InfiniteData<ConversationMessageType[], unknown>, Error>
	>;
}

const ConversationMessageLoadMore = ({
	fetchNextPage,
	hasNextPage,
	className,
}: ConversationMessageLoadMoreProps) => {
	if (!hasNextPage) return <></>;

	return (
		<Button
			className={className}
			variant="outline"
			onClick={() => {
				fetchNextPage();
			}}
		>
			Load More
		</Button>
	);
};

export default ConversationMessageLoadMore;
