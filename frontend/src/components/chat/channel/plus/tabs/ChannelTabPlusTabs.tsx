import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChannelCreationTab from "./ChannelCreationTab";
import ChannelJoinTab from "./ChannelJoinTab";

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
				<ChannelCreationTab />
			</TabsContent>

			<TabsContent value="join">
				<ChannelJoinTab />
			</TabsContent>
		</Tabs>
	);
};

export default ChannelTabPlusTabs;
