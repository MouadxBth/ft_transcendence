"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameReceivedRequestsForm from "./GameReceivedRequestsForm";
import GameSentRequestsForm from "./GameSentRequestsForm";

export interface GameRequestsTabsProps {
	className?: string;
}

const GameRequestsTabs = ({ className }: GameRequestsTabsProps) => {
	return (
		<Tabs
			className={className}
			defaultValue="received"
		>
			<TabsList className="w-full">
				<TabsTrigger
					value="received"
					className="basis-1/2"
				>
					Received
				</TabsTrigger>
				<TabsTrigger
					value="sent"
					className="basis-1/2"
				>
					Sent
				</TabsTrigger>
			</TabsList>

			<TabsContent value="received">
				<GameReceivedRequestsForm />
			</TabsContent>
			<TabsContent value="sent">
				<GameSentRequestsForm />
			</TabsContent>
		</Tabs>
	);
};

export default GameRequestsTabs;
