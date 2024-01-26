import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { cn } from "@/lib/utils";

export interface ProfileFriendLoadingProps {
	className?: string;
}

const ProfileFriendLoading = ({ className }: ProfileFriendLoadingProps) => {
	return (
		<Button
			className={cn("rounded-full flex space-x-2 items-center", className)}
			variant="outline"
			disabled
		>
			<Loading className="h-4" />
			<div>Loading</div>
		</Button>
	);
};

export default ProfileFriendLoading;
