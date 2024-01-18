import "./globals.css";
import type { Metadata } from "next";
import AuthenticationContextProvider from "@/providers/AuthenticationContextProvider";
import { AUTHORS } from "@/lib/authors";
import { Audiowide } from "next/font/google";
import { ReactQueryClientProvider } from "@/providers/ReactQueryClientProvider";
import { Toaster } from "@/components/ui/toaster";

const audiowide = Audiowide({ subsets: ["latin"], weight: "400" });

const authors = AUTHORS.map((author) => {
	return {
		name: `${author.firstName} ${author.lastName}`,
		url: author.socials[0].link,
	};
});

export const metadata: Metadata = {
	title: "ft_transcendence",
	description: "Through my work, you shall transcend!",
	authors: authors,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={audiowide.className}>
				<ReactQueryClientProvider>
					<AuthenticationContextProvider>{children}</AuthenticationContextProvider>
				</ReactQueryClientProvider>
				<Toaster />
			</body>
		</html>
	);
}
