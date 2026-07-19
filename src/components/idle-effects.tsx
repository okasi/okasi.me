"use client";

import { useEffect, useState } from "react";

const IDLE_TIMEOUT_MS = 60_000;
const TITLE_INTERVAL_MS = 800;
const FAVICON_INTERVAL_MS = 42;
const TITLE_FRAMES = ["ᶻ", "ᶻᶻ", "ᶻᶻᶻ", "ᶻᶻ"];
const ACTIVITY_EVENTS = ["mousemove", "scroll", "keydown", "click"] as const;

function faviconData(svg: string) {
	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function spinnerIcon(angle: number) {
	return faviconData(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g transform="rotate(${angle} 50 50)"><circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" stroke-width="12" stroke-dasharray="160 80" stroke-linecap="round"/><circle cx="50" cy="50" r="20" fill="#a855f7"/></g></svg>`,
	);
}

const sleepingIcon = faviconData(
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">😴</text></svg>`,
);

export function IdleEffects() {
	const [idle, setIdle] = useState(false);

	useEffect(() => {
		const existingIcon =
			document.querySelector<HTMLLinkElement>("link[rel='icon']");
		const icon = existingIcon ?? document.createElement("link");
		const originalHref = icon.getAttribute("href");
		const originalType = icon.getAttribute("type");
		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (!existingIcon) {
			icon.rel = "icon";
			document.head.appendChild(icon);
		}
		icon.type = "image/svg+xml";

		let isIdle = false;
		let idleTitle = "";
		let angle = 0;
		let idleTimeout: number | undefined;
		let titleInterval: number | undefined;
		let faviconInterval: number | undefined;

		const stopFavicon = () => {
			if (faviconInterval) window.clearInterval(faviconInterval);
			faviconInterval = undefined;
		};

		const startFavicon = () => {
			stopFavicon();
			icon.href = spinnerIcon(angle);
			if (reducedMotion) return;

			faviconInterval = window.setInterval(() => {
				angle = (angle + 7) % 360;
				icon.href = spinnerIcon(angle);
			}, FAVICON_INTERVAL_MS);
		};

		const stopTitleAnimation = () => {
			if (titleInterval) window.clearInterval(titleInterval);
			titleInterval = undefined;
		};

		const enterIdle = () => {
			isIdle = true;
			idleTitle = document.title;
			stopFavicon();
			icon.href = sleepingIcon;
			setIdle(true);

			let frame = 0;
			const updateTitle = () => {
				document.title = `${TITLE_FRAMES[frame]} | ${idleTitle}`;
				frame = (frame + 1) % TITLE_FRAMES.length;
			};

			updateTitle();
			titleInterval = window.setInterval(updateTitle, TITLE_INTERVAL_MS);
		};

		const handleActivity = () => {
			if (idleTimeout) window.clearTimeout(idleTimeout);

			if (isIdle) {
				isIdle = false;
				stopTitleAnimation();
				document.title = idleTitle;
				idleTitle = "";
				setIdle(false);
				startFavicon();
			}

			idleTimeout = window.setTimeout(enterIdle, IDLE_TIMEOUT_MS);
		};

		startFavicon();
		handleActivity();
		for (const event of ACTIVITY_EVENTS) {
			document.addEventListener(event, handleActivity, { passive: true });
		}

		return () => {
			if (idleTimeout) window.clearTimeout(idleTimeout);
			stopTitleAnimation();
			stopFavicon();
			for (const event of ACTIVITY_EVENTS) {
				document.removeEventListener(event, handleActivity);
			}
			if (idleTitle) document.title = idleTitle;
			if (originalHref === null) icon.remove();
			else {
				icon.setAttribute("href", originalHref);
				if (originalType === null) icon.removeAttribute("type");
				else icon.setAttribute("type", originalType);
			}
		};
	}, []);

	if (!idle) return null;

	return (
		<div
			aria-hidden
			data-testid="screensaver"
			className="pointer-events-none fixed inset-0 z-[100000] overflow-hidden bg-neutral-950 text-white"
		>
			<div className="screensaver-bounce p-4 font-mono text-3xl text-indigo-400 opacity-80">
				Oka Si
				<br />
				<span className="text-sm text-white opacity-50">#screensaver</span>
			</div>
		</div>
	);
}
