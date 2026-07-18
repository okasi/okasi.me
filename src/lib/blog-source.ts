import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { blog, meta } from "@/.source";

const mdxSource = toFumadocsSource(blog, meta);

export const blogSource = loader({
	baseUrl: "/blog",
	source: mdxSource,
});
