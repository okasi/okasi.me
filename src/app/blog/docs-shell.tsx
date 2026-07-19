"use client";

import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import type { blogSource } from "@/lib/blog-source";
import { blogLayoutOptions } from "./config";

type BlogTree = typeof blogSource.pageTree;

export function DocsShell({
	children,
	tree,
}: {
	children: ReactNode;
	tree: BlogTree;
}) {
	return (
		<RootProvider
			theme={{ defaultTheme: "dark", enableSystem: false }}
			search={{ options: { api: "/api/search" } }}
		>
			<DocsLayout tree={tree} {...blogLayoutOptions}>
				{children}
			</DocsLayout>
		</RootProvider>
	);
}
