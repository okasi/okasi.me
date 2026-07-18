"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function BlogThemeToggle({ className }: { className?: string }) {
	const [dark, setDark] = useState(true);

	useEffect(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);

	const toggle = () => {
		const html = document.documentElement;
		const next = html.classList.contains("dark") ? "light" : "dark";
		if (next === "light") html.classList.remove("dark");
		else html.classList.add("dark");
		try {
			localStorage.setItem("theme", next);
		} catch {
			/* ignore */
		}
		setDark(next === "dark");
	};

	return (
		<button
			type="button"
			data-theme-toggle=""
			aria-label="Toggle theme"
			onClick={toggle}
			className={
				className ??
				"inline-flex items-center rounded-full border border-fd-border p-1 overflow-hidden"
			}
		>
			<Sun
				className={`size-6.5 p-1.5 ${dark ? "text-fd-muted-foreground" : "bg-fd-accent text-fd-accent-foreground rounded-full"}`}
				fill="currentColor"
			/>
			<Moon
				className={`size-6.5 p-1.5 ${dark ? "bg-fd-accent text-fd-accent-foreground rounded-full" : "text-fd-muted-foreground"}`}
				fill="currentColor"
			/>
		</button>
	);
}
