"use client";

import privatePage from "@/components/auth/protection/PrivatePage";
import Navbar from "@/components/navbar/Navbar";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col h-screen max-h-screen">
			<header>
				<Navbar />
			</header>
			<main className="h-[calc(100vh-80px)]">{children}</main>
		</div>
	);
};

export default privatePage(AuthenticatedLayout);
