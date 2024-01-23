"use client";

import privatePage from "@/components/auth/protection/PrivatePage";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="h-screen flex flex-col">
			<ScrollArea className="h-full">
				<Navbar />
				{children}
			</ScrollArea>
		</main>
	);
};

export default privatePage(AuthenticatedLayout);
