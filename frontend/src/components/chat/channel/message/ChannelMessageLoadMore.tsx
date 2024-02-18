"use client";

import { Button } from "@/components/ui/button";
import { ChannelMessageType } from "@/lib/types/channel/channel-message";
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult,
} from "@tanstack/react-query";

export interface ChannelMessageLoadMoreProps {
	className?: string;
	channel: string;
	hasNextPage: boolean;
	fetchNextPage: (
		options?: FetchNextPageOptions | undefined
	) => Promise<InfiniteQueryObserverResult<InfiniteData<ChannelMessageType[], unknown>, Error>>;
}

const ChannelMessageLoadMore = ({
	fetchNextPage,
	hasNextPage,
	className,
}: ChannelMessageLoadMoreProps) => {
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

export default ChannelMessageLoadMore;
