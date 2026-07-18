"use client";

import { useEffect } from "react";

/** Clear blog/docs UI side effects so home Tailwind breakpoints work after client nav */
export function HomeRouteCleanup() {
	useEffect(() => {
		const html = document.documentElement;
		const body = document.body;

		body.style.overflow = "";
		body.style.paddingRight = "";
		body.style.pointerEvents = "";
		html.style.overflow = "";
		body.removeAttribute("data-scroll-locked");
		body.removeAttribute("data-sidebar-open");

		// Fumadocs docs grid vars — can skew layout if they linger on <html>
		for (const name of [
			"--fd-sidebar-width",
			"--fd-toc-width",
			"--fd-sidebar-col",
			"--fd-docs-height",
			"--fd-header-height",
			"--fd-toc-popover-height",
		]) {
			html.style.removeProperty(name);
		}

		const fireResize = () => window.dispatchEvent(new Event("resize"));
		fireResize();
		const t = window.setTimeout(fireResize, 0);
		const t2 = window.setTimeout(fireResize, 100);

		return () => {
			window.clearTimeout(t);
			window.clearTimeout(t2);
		};
	}, []);

	return null;
}
