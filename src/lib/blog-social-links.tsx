import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import {
	IconGithub,
	IconInstagram,
	IconLinkedin,
	IconTelegram,
	IconTwitter,
	IconYoutube,
} from "@/components/home/SocialIcons";

export const blogSocialLinks: LinkItemType[] = [
	{
		type: "icon",
		label: "GitHub",
		text: "GitHub",
		url: "https://github.com/okasi",
		external: true,
		icon: <IconGithub className="size-4" />,
	},
	{
		type: "icon",
		label: "LinkedIn",
		text: "LinkedIn",
		url: "https://www.linkedin.com/in/okasi",
		external: true,
		icon: <IconLinkedin className="size-4" />,
	},
	{
		type: "icon",
		label: "Telegram",
		text: "Telegram",
		url: "https://t.me/okasi_me",
		external: true,
		icon: <IconTelegram className="size-4" />,
	},
	{
		type: "icon",
		label: "YouTube",
		text: "YouTube",
		url: "https://www.youtube.com/channel/UCoSvb8yzs5O1RzAlM24uU2Q",
		external: true,
		icon: <IconYoutube className="size-4" />,
	},
	{
		type: "icon",
		label: "Twitter",
		text: "Twitter",
		url: "https://twitter.com/okasi_me",
		external: true,
		icon: <IconTwitter className="size-4" />,
	},
	{
		type: "icon",
		label: "Instagram",
		text: "Instagram",
		url: "https://www.instagram.com/okasi.me/",
		external: true,
		icon: <IconInstagram className="size-4" />,
	},
];
