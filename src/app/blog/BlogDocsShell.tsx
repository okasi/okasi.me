"use client";

import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { BlogThemeToggle } from "@/app/blog/BlogThemeToggle";
import { blogLayoutOptions } from "@/app/layout.config";
import type { blogSource } from "@/lib/blog-source";

type BlogTree = typeof blogSource.pageTree;

export function BlogDocsShell({
	children,
	tree,
}: {
	children: ReactNode;
	tree: BlogTree;
}) {
	return (
		<RootProvider
			theme={{ enabled: false }}
			search={{
				options: {
					api: "/api/search",
				},
			}}
		>
			<DocsLayout
				tree={tree}
				{...blogLayoutOptions}
				themeSwitch={{ enabled: false }}
				slots={{
					themeSwitch: (props) => (
						<BlogThemeToggle className={props.className} />
					),
				}}
			>
				{children}
			</DocsLayout>
		</RootProvider>
	);
}
