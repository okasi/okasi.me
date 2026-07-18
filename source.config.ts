import {
	defineConfig,
	defineDocs,
	frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const { docs: blog, meta } = defineDocs({
	dir: "src/content/blog",
	docs: {
		schema: frontmatterSchema.extend({
			date: z.coerce.date().optional(),
		}),
	},
});

export default defineConfig();
