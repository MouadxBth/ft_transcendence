import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface GameFristPlayerProps {
	avatar?: string;
	authenticatedUser: any;
}

const GameFristPlayer = ({ avatar, authenticatedUser }: GameFristPlayerProps) => {
	return (
		<div>
			<div className="flex flex-col justify-center items-center space-y-3 w-full h-full">
				<Avatar className="h-32 w-32 text-white border-amber-500 border-2">
					<AvatarImage
						className="object-cover"
						src={
							avatar
								? avatar.startsWith("http")
									? avatar
									: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${avatar}`
								: ""
						}
					/>
					<AvatarFallback>
						{authenticatedUser?.user.nickname?.toUpperCase().slice(0, 2)}
					</AvatarFallback>
				</Avatar>
				<p>{authenticatedUser?.user.nickname}</p>
			</div>
		</div>
	);
};

export default GameFristPlayer;
