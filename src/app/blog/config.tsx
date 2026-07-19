import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { SocialIcon, socialLinks } from "@/components/social-links";

export const blogLayoutOptions = {
	nav: {
		title: "Oka Si",
		url: "/",
	},
	links: [
		{ text: "Home", url: "/" },
		{ text: "Blog", url: "/blog" },
		...socialLinks.map(({ label, href, icon }) => ({
			type: "icon" as const,
			label,
			text: label,
			url: href,
			external: true,
			icon: <SocialIcon name={icon} className="size-4" />,
		})),
	],
} satisfies BaseLayoutProps;
