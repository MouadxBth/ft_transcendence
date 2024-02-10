import ChannelTabListItemSkeleton from "./ChannelTabListItemSkeleton";

const ChannelTabListSkeleton = () => {
	return (
		<>
			{Array.from({ length: 10 }).map((_, i, a) => (
				<ChannelTabListItemSkeleton key={i} />
			))}
		</>
	);
};

export default ChannelTabListSkeleton;
