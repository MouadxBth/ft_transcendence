import React from "react";
import HistoryOfPong from "./sections/HistoryOfPong";
import Features from "./sections/Features";
import Instructions from "./sections/Instructions";

const LandingPageDescription = () => {
	return (
		<article className="pb-10">
			<HistoryOfPong />
			<Features />
			<Instructions />
		</article>
	);
};

export default LandingPageDescription;
