import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { blogSocialLinks } from "@/lib/blog-social-links";

export const blogLayoutOptions: BaseLayoutProps = {
	nav: {
		title: "Oka Si",
		url: "/",
	},
	links: [
		{ text: "Home", url: "/" },
		{ text: "Blog", url: "/blog" },
		...blogSocialLinks,
	],
	themeSwitch: {
		enabled: false,
	},
};
