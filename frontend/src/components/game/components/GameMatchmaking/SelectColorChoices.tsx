import { CarouselItem } from "@/components/ui/carousel";
import { color } from "./colorsMode";
import { Card, CardContent } from "@/components/ui/card";

const SelectColorChoices = () => {
	return (
		<>
			{color.map(({ title, color }) => (
				<CarouselItem key={title}>
					<div className="p-1">
						<Card>
							<CardContent
								className={`flex aspect-square items-center justify-center p-6 ${color}`}
							>
								<span className="text-md font-semibold">{title}</span>
							</CardContent>
						</Card>
					</div>
				</CarouselItem>
			))}
		</>
	);
};

export default SelectColorChoices;
