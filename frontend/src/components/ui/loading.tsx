import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loading = ({ className }: { className?: string }) => {
	return <Loader2 className={cn("h-20 w-auto animate-spin", className)} />;
};

export default Loading;
