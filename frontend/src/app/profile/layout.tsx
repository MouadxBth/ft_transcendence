"use client";

import privatePage from "@/components/auth/protection/PrivatePage";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default privatePage(AuthenticatedLayout);
