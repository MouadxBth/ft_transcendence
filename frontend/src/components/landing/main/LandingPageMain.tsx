"use client";

import React from "react";
import TitleSection from "./TitleSection";
import TabsSection from "./TabsSection";
import { useAuthentication } from "@/contexts/AuthenticationContext";

const LandingPageMain = () => {
	const { authenticatedUser } = useAuthentication();

	return (
		<article className="min-h-screen flex max-lg:flex-col items-center">
			<section className="w-full h-full flex flex-col items-center justify-center  mb-10 ">
				<TitleSection />
			</section>

			<section
				className={`${
					authenticatedUser ? " hidden" : " block"
				} w-full h-full flex justify-center items-center  pb-10`}
			>
				<TabsSection />
			</section>
		</article>
	);
};

export default LandingPageMain;
