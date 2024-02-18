import ChannelInput from "@/components/chat/channel/ChannelInput";
import ChannelHeader from "@/components/chat/channel/header/ChannelHeader";
import ChannelMessageList from "@/components/chat/channel/message/ChannelMessageList";

const ChannelPage = ({ params }: { params: { id: string } }) => {
	return (
		<article className="w-3/4 h-full flex flex-col">
			<ChannelHeader name={params.id} />

			<ChannelMessageList
				channel={params.id}
				className="h-full "
			/>

			<div className="bg-red-500">
				<ChannelInput channel={params.id} />
			</div>
		</article>
	);
};

export default ChannelPage;
