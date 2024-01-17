import { Loader2 } from "lucide-react";

const Loading = () => {
	return (
		<div className="w-full min-h-screen flex items-center justify-center">
			<Loader2 className="h-20 w-auto animate-spin" />
		</div>
	);
};

export default Loading;
