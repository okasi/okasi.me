"use client";

import { useEffect } from "react";

export function AnimatedFavicon() {
	useEffect(() => {
		let link: HTMLLinkElement | null =
			document.querySelector("link[rel*='icon']");
		if (!link) {
			link = document.createElement("link");
			link.rel = "icon";
			document.head.appendChild(link);
		}

		let angle = 0;
		let intervalId: ReturnType<typeof setInterval> | null = null;

		const startAnimation = () => {
			if (intervalId) return;
			intervalId = setInterval(() => {
				angle = (angle + 7) % 360; // 7 degrees increment
				// A simple sleek SVG that rotates
				const svg = `
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
						<g transform="rotate(${angle} 50 50)">
							<circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" stroke-width="12" stroke-dasharray="160 80" stroke-linecap="round" />
							<circle cx="50" cy="50" r="20" fill="#a855f7" />
						</g>
					</svg>
				`
					.trim()
					.replace(/\s+/g, " ");

				link!.href = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
			}, 42);
		};

		const stopAnimation = () => {
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}
		};

		const handleScreensaver = (e: Event) => {
			const active = (e as CustomEvent).detail.active;
			if (active) {
				stopAnimation();
				const sleepSvg = `
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
						<text y=".9em" font-size="90">😴</text>
					</svg>
				`
					.trim()
					.replace(/\s+/g, " ");
				link!.href = `data:image/svg+xml;utf8,${encodeURIComponent(sleepSvg)}`;
			} else {
				startAnimation();
			}
		};

		window.addEventListener("screensaver", handleScreensaver);
		startAnimation();

		return () => {
			window.removeEventListener("screensaver", handleScreensaver);
			stopAnimation();
		};
	}, []);

	return null;
}
