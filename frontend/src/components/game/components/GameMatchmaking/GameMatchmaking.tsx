"use client";
import useFriends from "@/hooks/user/useFriends";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import React from "react";
import { useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import SelectMode from "./SelectMode";
import SelectModeColor from "./SelectModeColor";
import GameMatchmakingButtons from "./GameMatchmakingButtons";
import GameSelectFriend from "./GameSelectFriend";
import MatchmakingTitle from "./MatchmakingTitle";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const GameMatchmaking = () => {
	const [isCustom, setIscCustom] = useState(false);
	const handleClassic = () => {
		setIscCustom(false);
	};
	const handleCustom = () => {
		setIscCustom(true);
	};
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}
		setCurrent(api.selectedScrollSnap());

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);
	const { authenticatedUser } = useAuthentication();
	const username = authenticatedUser!.user.username;
	const { data, isLoading, isSuccess, isError, error } = useFriends(username);
	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error: {error?.message}</p>;
	}

	if (isSuccess) {
		console.log("Friends:", data);
	}
	return (
		<div className="w-full h-full flex items-center justify-center">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel>
					<div className="h-full w-full flex flex-col items-center justify-center space-y-5">
						<MatchmakingTitle />
						<SelectMode
							handleClassic={handleClassic}
							handleCustom={handleCustom}
						/>
						<div className="flex items-center space-x-3">
							<Checkbox /> <span className="text-md">Ranked</span>
						</div>
						{isCustom && <SelectModeColor />}
						<GameSelectFriend />
						<GameMatchmakingButtons />
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};

export default GameMatchmaking;
