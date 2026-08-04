import defaultMdxComponents from "fumadocs-ui/mdx";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogTimestamps } from "@/components/blog-timestamps";
import { blogSource } from "@/lib/blog-source";

type BlogPostProps = {
	params: Promise<{ slug: string[] }>;
};

const tocOptions = { style: "clerk" as const };

export default async function BlogPostPage({ params }: BlogPostProps) {
	const page = blogSource.getPage((await params).slug);
	if (!page) notFound();

	const MDX = page.data.body;

	return (
		<DocsPage toc={page.data.toc} tableOfContent={tocOptions}>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<BlogTimestamps published={page.data.date} updated={page.data.updated} />
			<DocsBody>
				<MDX components={defaultMdxComponents} />
			</DocsBody>
		</DocsPage>
	);
}

export function generateStaticParams() {
	return blogSource.generateParams();
}

export async function generateMetadata({
	params,
}: BlogPostProps): Promise<Metadata> {
	const page = blogSource.getPage((await params).slug);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
	};
}
