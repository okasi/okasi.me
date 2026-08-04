import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { blog, meta } from "@/.source";

export const blogSource = loader({
	baseUrl: "/blog",
	source: toFumadocsSource(blog, meta),
});
