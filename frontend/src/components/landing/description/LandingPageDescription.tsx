import Title from "@/components/ui/title";
import React from "react";
import HistoryOfPong from "./HistoryOfPong";
import Features from "./Features";
import Instructions from "./Instructions";

{
	/* <section className=" flex  flex-row-reverse  h-full items-center py-5 max-md:flex-col">
<Title className="text-center text-4xl w-1/3">Features of the website</Title>

<p className="text-md px-2  h-full w-2/3">
	Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
	been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
	took a galley of type and scrambled it to make a type specimen book. It has survived not
	only five centuries, but also the leap into electronic typesetting, remaining essentially
	unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
	Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
	PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the
	printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy
	text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
	to make a type specimen book.Lorem Ipsum has been the industry&apos;s standard dummy text
	ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
	make a type specimen book.
</p>
</section>

<section className="flex h-full items-center py-5 max-md:flex-col">
<Title className="text-center text-4xl w-1/3">Instructions of the game</Title>

<p className="text-md px-2  h-full w-2/3">
	Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
	been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
	took a galley of type and scrambled it to make a type specimen book. It has survived not
	only five centuries, but also the leap into electronic typesetting, remaining essentially
	unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
	Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
	PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the
	printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy
	text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
	to make a type specimen book.Lorem Ipsum has been the industry&apos;s standard dummy text
	ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
	make a type specimen book.
</p>
</section> */
}

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
