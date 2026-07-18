"use client";

import { useEffect } from "react";

const STORAGE_KEY = "theme";

export function BlogThemeManager() {
	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored === "light") document.documentElement.classList.remove("dark");
			else document.documentElement.classList.add("dark");
		} catch {
			document.documentElement.classList.add("dark");
		}
	}, []);

	return null;
}
