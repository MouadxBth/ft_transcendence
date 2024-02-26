"use client";

import ChannelInput from "@/components/chat/channel/ChannelInput";
import ChannelHeader from "@/components/chat/channel/header/ChannelHeader";
import ChannelMessageList from "@/components/chat/channel/message/ChannelMessageList";
import Loading from "@/components/ui/loading";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import useBlocked from "@/hooks/user/block/useBlocked";
import { useEffect, useState } from "react";

const ChannelPage = ({ params }: { params: { id: string } }) => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading } = useBlocked(authenticatedUser?.user.username!);
	const [loading, setLoading] = useState(true);
	const [blocked, setBlocked] = useState<string[]>([]);

	useEffect(() => {
		if (isLoading) return;

		if (data) setBlocked(data);
		setLoading(false);
	}, [isLoading, data]);

	if (loading) {
		<article className="w-3/4 h-full flex flex-col">
			<Loading />
		</article>;
	}

	return (
		<article className="w-3/4 h-full flex flex-col">
			<ChannelHeader name={params.id} />

			<ChannelMessageList
				channel={params.id}
				blocked={blocked}
				className="h-full "
			/>

			<div className="bg-red-500">
				<ChannelInput channel={params.id} />
			</div>
		</article>
	);
};

export default ChannelPage;
