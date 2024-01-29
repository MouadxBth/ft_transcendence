import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SelectMode = () => {
	return (
		<div className="flex flex-col items-center space-y-3">
			<p className="text-xs text-muted-foreground">Choose you game mode</p>
			<div>
				<RadioGroup
					defaultValue="classic"
					className="flex items-center justify-around"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="classic"
							id="classic"
						/>
						<Label htmlFor="classic">Classic</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="custom"
							id="custom"
						/>
						<Label htmlFor="custom">Custom</Label>
					</div>
				</RadioGroup>
			</div>
		</div>
	);
};

export default SelectMode;
