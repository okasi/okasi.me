import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/blog/ssg-with-sveltekit",
				destination: "/blog/static-sites-that-feel-alive",
				permanent: true,
			},
		];
	},
};

export default createMDX()(nextConfig);
