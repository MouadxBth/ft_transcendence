import ConversationInput from "@/components/chat/conversation/ConversationInput";
import ConversationHeader from "@/components/chat/conversation/header/ConversationHeader";
import ConversationMessageList from "@/components/chat/conversation/message/ConversationMessageList";

const ConversationPage = ({ params }: { params: { id: string } }) => {
	return (
		<article className="w-3/4 h-full flex flex-col">
			<ConversationHeader name={params.id} />

			<ConversationMessageList
				target={params.id}
				className="h-full "
			/>

			<ConversationInput target={params.id} />
		</article>
	);
};

export default ConversationPage;
