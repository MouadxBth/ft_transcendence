"use client";

import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TitleSection = () => {
	const { authenticatedUser } = useAuthentication();
	const { push } = useRouter();

	return (
		<>
			<Title className="text-7xl pb-10 pl-5">Ping Pong</Title>

			<Image
				src="/ping-pong.gif"
				priority
				alt="gif"
				width="0"
				height="0"
				className="sm:w-[382px] sm:h-[272px] w-[382px] h-[272px] rounded-lg shadow-xl shadow-blue-500/50"
			/>

			<Button
				className={`${authenticatedUser ? " block" : " hidden"} mt-12 rounded-xl w-32`}
				variant="default"
				onClick={() => push("/profile")}
			>
				Play
			</Button>
		</>
	);
};

export default TitleSection;
