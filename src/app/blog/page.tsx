import defaultMdxComponents from "fumadocs-ui/mdx";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogSource } from "@/lib/blog-source";

export const metadata: Metadata = {
	title: "Blog",
};

export default async function BlogIndexPage() {
	const posts = [...blogSource.getPages()].sort((a, b) => {
		const da = a.data.date ? new Date(a.data.date).getTime() : 0;
		const db = b.data.date ? new Date(b.data.date).getTime() : 0;
		return db - da;
	});

	return (
		<DocsPage>
			<DocsTitle>Blog</DocsTitle>
			<DocsDescription>
				Notes on code, longevity, and building things.
			</DocsDescription>
			<DocsBody>
				<ul className="not-prose flex flex-col gap-4">
					{posts.map((page) => (
						<li key={page.url}>
							<Link
								href={page.url}
								className="block rounded-lg border border-fd-border bg-fd-card/40 p-4 transition hover:bg-fd-muted/30"
							>
								<span className="font-medium text-fd-foreground">
									{page.data.title}
								</span>
								{page.data.description ? (
									<p className="mt-1 text-sm text-fd-muted-foreground">
										{page.data.description}
									</p>
								) : null}
								{page.data.date ? (
									<time
										className="mt-2 block text-xs text-fd-muted-foreground"
										dateTime={String(page.data.date)}
									>
										{new Date(page.data.date).toLocaleDateString("en-SE", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</time>
								) : null}
							</Link>
						</li>
					))}
				</ul>
			</DocsBody>
		</DocsPage>
	);
}
