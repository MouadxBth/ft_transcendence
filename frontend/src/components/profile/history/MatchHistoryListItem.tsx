import { Separator } from "@/components/ui/separator";
import { MatchHistoryType } from "@/lib/types/match-history";
import Image from "next/image";

const MatchHistoryListItem = ({ nickname, firstAvatar, secondAvatar, won }: MatchHistoryType) => {
	return (
		<>
			<div className="flex justify-between">
				<div className="flex flex-col items-center space-y-2">
					<Image
						className=" rounded-full"
						src={firstAvatar}
						alt={nickname}
						width={32}
						height={32}
					/>
					<span className="text-md">{nickname}</span>
				</div>
				<div className="flex items-center w-1/3">
					<hr className="flex-grow border-t-2" />
					<div className="mx-4 flex flex-col space-y-2">
						<div>VS</div>
						<div className={`${won ? "text-green-500" : "text-red-500"}`}>
							{won ? "Won" : "Lost"}
						</div>
					</div>
					<hr className="flex-grow border-t-2 " />
				</div>
				<div className="flex flex-col items-center space-y-2">
					<Image
						className=" rounded-full"
						src={secondAvatar}
						alt={nickname}
						width={32}
						height={32}
					/>
					<span className="text-md">{nickname}</span>
				</div>
			</div>
			<Separator className="my-2" />
		</>
	);
};

export default MatchHistoryListItem;
