import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { blog, meta } from "@/.source";

const dateFormatter = new Intl.DateTimeFormat("en-SE", {
	year: "numeric",
	month: "long",
	day: "numeric",
	timeZone: "UTC",
});

export const blogSource = loader({
	baseUrl: "/blog",
	source: toFumadocsSource(blog, meta),
});

export function formatBlogDate(date: Date) {
	return dateFormatter.format(date);
}
