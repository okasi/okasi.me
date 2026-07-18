import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

import { AnimatedFavicon } from "@/components/AnimatedFavicon";
import { Screensaver } from "@/components/Screensaver";

export const metadata: Metadata = {
	title: {
		default: "Oka Si",
		template: "%s | Oka Si",
	},
	description:
		"Okan's personal website and blog. Exploring web development, design, and engineering.",
	keywords: [
		"Okan",
		"Oka Si",
		"Software Engineer",
		"Web Developer",
		"Blog",
		"Portfolio",
	],
	authors: [{ name: "Okan" }],
	creator: "Okan",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://okasi.me",
		title: "Oka Si",
		description: "Okan's personal website and blog.",
		siteName: "Oka Si",
	},
	twitter: {
		card: "summary_large_image",
		title: "Oka Si",
		description: "Okan's personal website and blog.",
		creator: "@okan", // Update with actual handle if needed
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning className={inter.variable}>
			<body className="min-h-screen antialiased">
				<AnimatedFavicon />
				<Screensaver />
				{children}
			</body>
		</html>
	);
}
