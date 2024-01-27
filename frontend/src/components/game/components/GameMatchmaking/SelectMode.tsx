import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export interface SelectModeProps {
	handleState: () => void;
}

const SelectMode = ({ handleState }: SelectModeProps) => {
	return (
		<div className="flex flex-col items-center space-y-3">
			<p className="text-xs text-muted-foreground">Choose you game mode</p>
			<CardContent>
				<RadioGroup
					defaultValue="classic"
					className="flex items-center justify-around"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="classic"
							id="classic"
							onClick={handleState}
						/>
						<Label htmlFor="classic">Classic</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="custom"
							id="custom"
							onClick={handleState}
						/>
						<Label htmlFor="custom">Custom</Label>
					</div>
				</RadioGroup>
			</CardContent>
		</div>
	);
};

export default SelectMode;
