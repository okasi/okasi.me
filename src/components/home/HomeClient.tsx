"use client";

import { useEffect, useState } from "react";
import { BlurhashImage } from "./BlurhashImage";
import {
	IconGithub,
	IconInstagram,
	IconLinkedin,
	IconTelegram,
	IconTwitter,
	IconYoutube,
} from "./SocialIcons";

const passions = [
	"longevity",
	"voluntaryism",
	"accessible UX",
	"cutting-edge tech",
];

const socialLinks = [
	{ label: "GitHub", href: "https://github.com/okasi", Icon: IconGithub },
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/okasi",
		Icon: IconLinkedin,
	},
	{ label: "Telegram", href: "https://t.me/okasi_me", Icon: IconTelegram },
	{
		label: "YouTube",
		href: "https://www.youtube.com/channel/UCoSvb8yzs5O1RzAlM24uU2Q",
		Icon: IconYoutube,
	},
	{ label: "Twitter", href: "https://twitter.com/okasi_me", Icon: IconTwitter },
	{
		label: "Instagram",
		href: "https://www.instagram.com/okasi.me/",
		Icon: IconInstagram,
	},
];

export function HomeClient() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, []);

	return (
		<div className="relative z-10 flex min-h-screen flex-col">
			<div className="flex flex-1 items-center justify-center px-8 py-16">
				<div
					className={`home-hero-row flex w-full max-w-5xl flex-col items-center gap-12 transition-all duration-1000 lg:flex-row lg:items-start lg:justify-between ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
				>
					<div className="home-hero-copy flex-1 text-center lg:text-left">
						<h1 className="mb-4 text-5xl font-light text-white md:text-6xl lg:text-7xl">
							Yoyoyo, I&apos;m <span className="font-normal">Oka Si</span>
						</h1>
						<p className="mb-8 text-xl text-white/90 md:text-2xl">
							Full-Stack JavaScript Developer
						</p>

						<div className="mb-10">
							<p className="mb-2 text-sm uppercase tracking-widest text-white/60">
								Passion for
							</p>
							<div className="home-passions flex flex-wrap justify-center gap-x-6 gap-y-1 lg:justify-start">
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
						<div className="home-socials flex flex-wrap justify-center gap-4 lg:justify-start">
							{socialLinks.map(({ label, href, Icon }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={label}
									className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-all duration-300 hover:bg-white/20 hover:text-white"
								>
									<Icon />
								</a>
							))}
						</div>
					</div>

					<div className="shrink-0">
						<div className="h-48 w-48 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl md:h-56 md:w-56 lg:h-64 lg:w-64">
							<BlurhashImage src="/OkaSiPurple.jpg" alt="Oka Si" />
						</div>
					</div>
				</div>
			</div>

			<hr
				className="w-full border-0"
				style={{
					height: "1px",
					background: "#000000",
					boxShadow: "0 1px #ffffff13",
				}}
			/>

			<footer className="py-6 text-center">
				<p className="text-sm text-white/60">Made with ☢ in Stockholm</p>
				<p className="mt-2 text-xs text-white/45">
					Copyleft © [what-year-is-this]
				</p>
			</footer>
		</div>
	);
}
