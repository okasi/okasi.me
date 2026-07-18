import Script from "next/script";
import type { ReactNode } from "react";
import { blogSource } from "@/lib/blog-source";
import { BlogDocsShell } from "./BlogDocsShell";
import { BlogThemeManager } from "./BlogThemeManager";
import "./blog.css";

const themeBoot = `(function(){try{var t=localStorage.getItem('theme');var e=document.documentElement;if(t==='light')e.classList.remove('dark');else e.classList.add('dark')}catch(x){document.documentElement.classList.add('dark')}})();`;

export default function BlogLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Script
				id="blog-theme-boot"
				strategy="beforeInteractive"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Needed for Next.js inline script injection
				dangerouslySetInnerHTML={{ __html: themeBoot }}
			/>
			<div className="blog-shell">
				<BlogThemeManager />
				<BlogDocsShell tree={blogSource.pageTree}>{children}</BlogDocsShell>
			</div>
		</>
	);
}
