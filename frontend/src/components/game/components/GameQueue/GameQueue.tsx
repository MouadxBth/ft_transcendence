import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Loader, Loader2 } from "lucide-react";
import { useSearch } from "@/hooks/search/useSearch";
import useSingleUserSearch from "@/hooks/user/useSingleUserSearch";
import { useEffect, useState } from "react";
import useSockets from "@/hooks/socket/useSockets";
import { useRouter } from "next/navigation";

interface GameQueueProps {
	opponent: string,
	setStatus: (stat: string) => void,
}

const GameQueue = ({opponent, setStatus}: GameQueueProps) => {
	
	const { push } = useRouter();
	const { game } = useSockets();

	const handleAcceptRequest = () => {
		push("/chat");
		setStatus("confirmed");
	}

	const handleDenyRequest = () => {
		setStatus("choose");
	}

	useEffect(() => {
		game?.on("request_accepted", handleAcceptRequest)
		game?.on("request_denied", handleDenyRequest)
	}, [game])

	const { authenticatedUser } = useAuthentication();
	const avatar = authenticatedUser?.user.avatar;
	const { data } = useSingleUserSearch(opponent);
	const [isLoading, setIsLoading] = useState(true); //try true and false to see the difference
	
	console.log(opponent, data);

	return (
		<>
			<Card className="w-1/2 h-1/2 flex flex-col items-center justify-center">
				<CardHeader>
					{isLoading ? (
						<CardTitle>
							<div className="flex flex-col items-center justify-center space-y-3">
								<Loader className="animate-spin" size={40}/>
								{
									opponent ? <h1>Waiting for {data?.nickname} to accept...</h1> : <h1>Waiting for a player to join</h1>
								}
							</div>
						</CardTitle>
					) : (
						<CardTitle>
							<div className="flex flex-col items-center justify-center space-y-3">
								<div className="flex space-x-2">
									<p className="text-xl">Starting in</p>
									<Loader size={30} />
								</div>
								<h1 className="text-3xl">10</h1>
							</div>
						</CardTitle>
					)}
				</CardHeader>
				<CardContent className="flex justify-center items-center space-x-4 w-full h-full">
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
					<div>
						<h1 className="text-3xl">VS</h1>
					</div>
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
									src={data?.avatar}
								/>
								<AvatarFallback>{"flan".toUpperCase().slice(0, 2)}</AvatarFallback>
							</Avatar>
							<p>{data?.nickname}</p>
						</div>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default GameQueue;
