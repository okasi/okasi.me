import type { ReactNode } from "react";
import { blogSource } from "@/lib/blog-source";
import { DocsShell } from "./docs-shell";
import "./blog.css";

export default function BlogLayout({ children }: { children: ReactNode }) {
	return (
		<div className="blog-shell">
			<DocsShell tree={blogSource.pageTree}>{children}</DocsShell>
		</div>
	);
}
