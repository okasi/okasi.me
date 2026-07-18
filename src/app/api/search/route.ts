import { createFromSource } from "fumadocs-core/search/server";
import { blogSource } from "@/lib/blog-source";

export const { GET } = createFromSource(blogSource);
