"use client";

import LandingPageAbout from "@/components/landing/about/LandingPageAbout";
import LandingPageDescription from "@/components/landing/description/LandingPageDescription";
import LandingPageMain from "@/components/landing/main/LandingPageMain";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const LandingPage = () => {
	return (
		<main>
			<ScrollArea className="h-screen">
				<LandingPageMain />
				<LandingPageDescription />
				<LandingPageAbout />
			</ScrollArea>
		</main>
	);
};

export default LandingPage;
