"use client";

import privatePage from "@/components/auth/protection/PrivatePage";
import Navbar from "@/components/navbar/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ScrollArea className="flex flex-col h-screen max-h-screen">
			<header>
				<Navbar />
			</header>
			<main className="h-[calc(100vh-80px)]">{children}</main>
		</ScrollArea>
	);
};

export default privatePage(AuthenticatedLayout);
