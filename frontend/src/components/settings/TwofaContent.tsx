import { Button } from "../ui/button";
import { TabsContent } from "../ui/tabs";

const TwofaContent = ({ className, value }: { className?: string; value: string }) => {
	return (
		<TabsContent
			value={value}
			className={className}
		>
			<Button>Enable 2fa</Button>
		</TabsContent>
	);
};

export default TwofaContent;
