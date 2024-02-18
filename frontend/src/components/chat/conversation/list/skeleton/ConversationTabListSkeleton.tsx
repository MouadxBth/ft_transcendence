import ConversationTabListItemSkeleton from "./ConversationTabListItemSkeleton";

const ConversationTabListSkeleton = () => {
	return (
		<>
			{Array.from({ length: 10 }).map((_, i, a) => (
				<ConversationTabListItemSkeleton key={i} />
			))}
		</>
	);
};

export default ConversationTabListSkeleton;
