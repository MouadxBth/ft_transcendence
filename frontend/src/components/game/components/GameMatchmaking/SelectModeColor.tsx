import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { color } from "./colorsMode";
import { useEffect, useState } from "react";
import SelectColorChoices from "./SelectColorChoices";

const SelectModeColor = () => {
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
	return (
		<div>
			<CardContent className="flex flex-col justify-center items-center w-full">
				<p className="text-xs text-muted-foreground">Customise your game color</p>
				<Carousel
					setApi={setApi}
					className="w-1/6 flex items-center justify-center pt-6"
				>
					<CarouselContent>
						<SelectColorChoices />
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
				<p className="py-2 text-center text-xs text-muted-foreground">
					you selected {color[current].title}
				</p>
			</CardContent>
		</div>
	);
};

export default SelectModeColor;
