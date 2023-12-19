import "./globals.css";
import { AUTHORS } from "@/lib/authors";
import { Audiowide } from "next/font/google";
import type { Metadata } from "next";

const audiowide = Audiowide({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "ft_transcendence",
	description: "Through my work, you shall transcend!",
	authors: AUTHORS.map((author) => {
		return {
			name: `${author.firstName} ${author.lastName}`,
			url: author.socials[0].link,
		};
	}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={audiowide.className}>{children}</body>
		</html>
	);
}
