"use client";

import { useEffect, useRef, useState } from "react";

export function Screensaver() {
	const [isActive, setIsActive] = useState(false);
	const originalTitleRef = useRef("");

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout> | null = null;
		let intervalId: ReturnType<typeof setInterval> | null = null;

		// 60 seconds timeout to show screensaver
		const IDLE_TIMEOUT = 60000;

		const titles = ["ᶻ", "ᶻᶻ", "ᶻᶻᶻ", "ᶻᶻ"];
		let titleIndex = 0;

		const disable = () => {
			setIsActive((prev) => {
				if (prev) {
					// Restore original title
					if (originalTitleRef.current) {
						document.title = originalTitleRef.current;
					}
					window.dispatchEvent(
						new CustomEvent("screensaver", { detail: { active: false } }),
					);
					if (intervalId) clearInterval(intervalId);
				}
				return false;
			});

			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				window.dispatchEvent(
					new CustomEvent("screensaver", { detail: { active: true } }),
				);
				originalTitleRef.current = document.title;
				setIsActive(true);

				intervalId = setInterval(() => {
					document.title = `${titles[titleIndex % titles.length]} | ${originalTitleRef.current}`;
					titleIndex++;
				}, 800);
			}, IDLE_TIMEOUT);
		};

		disable();

		document.addEventListener("mousemove", disable, { passive: true });
		document.addEventListener("scroll", disable, { passive: true });
		document.addEventListener("keydown", disable, { passive: true });
		document.addEventListener("click", disable, { passive: true });

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
			if (intervalId) clearInterval(intervalId);
			document.removeEventListener("mousemove", disable);
			document.removeEventListener("scroll", disable);
			document.removeEventListener("keydown", disable);
			document.removeEventListener("click", disable);
			if (originalTitleRef.current) {
				document.title = originalTitleRef.current;
			}
		};
	}, []);

	if (!isActive) return null;

	return (
		<div
			className="fixed inset-0 z-[100000] bg-[rgba(10,10,10,0.98)] text-white overflow-hidden pointer-events-none"
			style={{ boxShadow: "0 0 0 100vmax rgba(10,10,10,0.98)" }}
		>
			<div className="screensaver-bounce w-[200px] h-[100px] text-3xl font-mono text-indigo-400 opacity-80 p-4">
				Oka Si
				<br />
				<span className="text-sm opacity-50 text-white">#screensaver</span>
			</div>
			<style>{`
				@keyframes screensaver-x {
					100% { transform: translateX(calc(100vw - 200px)); }
				}
				@keyframes screensaver-y {
					100% { transform: translateY(calc(100vh - 100px)); }
				}
				.screensaver-bounce {
					animation: screensaver-x 13s linear infinite alternate, screensaver-y 7s linear infinite alternate;
				}
			`}</style>
		</div>
	);
}
