import ChannelMemberListItemSkeleton from "./ChannelMemberListItemSkeleton";

const ChannelMemberListSkeleton = () => {
	return (
		<>
			{Array.from({ length: 10 }).map((_, i, a) => (
				<ChannelMemberListItemSkeleton key={i} />
			))}
		</>
	);
};

export default ChannelMemberListSkeleton;
