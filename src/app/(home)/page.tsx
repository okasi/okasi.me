import Link from "next/link";
import { CrosshairCursor } from "@/components/home/CrosshairCursor";
import { HomeClient } from "@/components/home/HomeClient";
import { Starfield } from "@/components/home/Starfield";

export default function HomePage() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-black">
			<Starfield />
			<CrosshairCursor />
			<HomeClient />
			<nav className="fixed right-4 top-4 z-20 sm:right-6 sm:top-6">
				<Link
					href="/blog"
					className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm transition hover:bg-white/20"
				>
					Blog
				</Link>
			</nav>
		</div>
	);
}
