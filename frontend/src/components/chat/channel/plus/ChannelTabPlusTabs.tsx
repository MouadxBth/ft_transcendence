import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChannelJoinForm from "../search/ChannelJoinSearch";
import ChannelCreateForm from "./form/ChannelCreateForm";

const ChannelTabPlusTabs = () => {
	return (
		<Tabs defaultValue="create">
			<TabsList className="w-full flex  py-2">
				<TabsTrigger
					value="create"
					className="basis-1/2"
				>
					Create
				</TabsTrigger>
				<TabsTrigger
					value="join"
					className="basis-1/2"
				>
					Join
				</TabsTrigger>
			</TabsList>

			<TabsContent value="create">
				<ChannelCreateForm />
			</TabsContent>

			<TabsContent value="join">
				<ChannelJoinForm />
			</TabsContent>
		</Tabs>
	);
};

export default ChannelTabPlusTabs;
