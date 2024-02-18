import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export interface GameSecondPlayerProps {
	isLoading: boolean;
	opponent: string;
	data: any;
}

const GameSecondPlayer = ({ isLoading, opponent, data }: GameSecondPlayerProps) => {
	return (
		<div>
			{isLoading && !opponent ? (
				<div className="flex flex-col justify-center items-center space-y-3 w-full h-full">
					<Skeleton className="h-32 w-32 rounded-full flex items-center justify-center">
						Waiting
					</Skeleton>
					<Skeleton className="h-6 w-20 rounded-full flex items-center justify-center"></Skeleton>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center space-y-3 w-full h-full">
					<Avatar className="h-32 w-32 text-white border-amber-500 border-2">
						<AvatarImage
							className="object-cover"
							src={
								data?.avatar
									? data?.avatar.startsWith("http")
										? data?.avatar
										: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${data?.avatar}`
									: ""
							}
						/>
						<AvatarFallback>{"flan".toUpperCase().slice(0, 2)}</AvatarFallback>
					</Avatar>
					<p>{data?.nickname}</p>
				</div>
			)}
		</div>
	);
};

export default GameSecondPlayer;
