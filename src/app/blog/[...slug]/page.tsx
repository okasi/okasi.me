import defaultMdxComponents from "fumadocs-ui/mdx";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { blogSource } from "@/lib/blog-source";

const tableOfContent = { style: "clerk" as const };

export default async function BlogPostPage(props: {
	params: Promise<{ slug: string[] }>;
}) {
	const params = await props.params;
	const page = blogSource.getPage(params.slug);
	if (!page) notFound();

	const MDX = page.data.body;

	return (
		<DocsPage toc={page.data.toc} tableOfContent={tableOfContent}>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			{page.data.date ? (
				<p className="text-sm text-fd-muted-foreground -mt-2 mb-4">
					<time dateTime={String(page.data.date)}>
						{new Date(page.data.date).toLocaleDateString("en-SE", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
				</p>
			) : null}
			<DocsBody>
				<MDX components={{ ...defaultMdxComponents }} />
			</DocsBody>
		</DocsPage>
	);
}

export function generateStaticParams() {
	return blogSource.generateParams();
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string[] }>;
}) {
	const params = await props.params;
	const page = blogSource.getPage(params.slug);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
	};
}
