import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import Link from "next/link";
import { blogSource, formatBlogDate } from "@/lib/blog-source";

export const metadata: Metadata = {
	title: "Blog",
};

export default function BlogIndexPage() {
	const posts = [...blogSource.getPages()].sort(
		(a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0),
	);

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
								className="block rounded-lg border border-fd-border bg-fd-card/40 p-4 transition-colors hover:bg-fd-muted/30"
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
										dateTime={page.data.date.toISOString()}
									>
										{formatBlogDate(page.data.date)}
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
