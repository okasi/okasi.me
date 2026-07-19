import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import profileImage from "@/assets/profile.jpg";
import { CrosshairCursor } from "@/components/home/crosshair-cursor";
import { Starfield } from "@/components/home/starfield";
import { SocialIcon, socialLinks } from "@/components/social-links";
import "./home.css";

const passions = [
	"longevity",
	"voluntaryism",
	"accessible UX",
	"cutting-edge tech",
];

export const metadata: Metadata = {
	title: "Home",
};

export default function HomePage() {
	return (
		<div className="home-page relative isolate min-h-screen overflow-hidden bg-black text-white">
			<Starfield />
			<CrosshairCursor />

			<div className="relative z-10 flex min-h-screen flex-col">
				<main className="flex flex-1 items-center justify-center px-8 py-16">
					<div className="home-intro flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
						<div className="flex-1 text-center lg:text-left">
							<h1 className="mb-4 text-5xl font-light md:text-6xl lg:text-7xl">
								Yoyoyo, I&apos;m <span className="font-normal">Oka Si</span>
							</h1>
							<p className="mb-8 text-xl text-white/90 md:text-2xl">
								Full-Stack JavaScript Developer
							</p>

							<div className="mb-10">
								<p className="mb-2 text-sm uppercase tracking-widest text-white/60">
									Passion for
								</p>
								<div className="flex flex-wrap justify-center gap-x-6 gap-y-1 lg:justify-start">
									{passions.map((passion) => (
										<span
											key={passion}
											className="cursor-default text-lg text-white/80 transition-colors hover:text-white"
										>
											{passion}
										</span>
									))}
								</div>
							</div>

							<p className="mb-2 text-sm uppercase tracking-widest text-white/60">
								Don&apos;t follow your dreams, follow my socials
							</p>
							<nav
								aria-label="Social links"
								className="flex flex-wrap justify-center gap-4 lg:justify-start"
							>
								{socialLinks.map(({ label, href, icon }) => (
									<a
										key={label}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
									>
										<SocialIcon name={icon} className="size-5" />
									</a>
								))}
							</nav>
						</div>

						<div className="relative size-48 shrink-0 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl md:size-56 lg:size-64">
							<Image
								src={profileImage}
								alt="Oka Si"
								fill
								priority
								placeholder="blur"
								sizes="(min-width: 1024px) 256px, (min-width: 768px) 224px, 192px"
								className="object-cover"
							/>
						</div>
					</div>
				</main>

				<hr className="border-0 border-t border-white/10" />
				<footer className="py-6 text-center">
					<p className="text-sm text-white/60">Made with ☢ in Stockholm</p>
					<p className="mt-2 text-xs text-white/45">
						Copyleft © [what-year-is-this]
					</p>
				</footer>
			</div>

			<nav className="fixed right-4 top-4 z-20 sm:right-6 sm:top-6">
				<Link
					href="/blog"
					className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
				>
					Blog
				</Link>
			</nav>
		</div>
	);
}
