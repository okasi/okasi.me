"use client";

import { useEffect, useRef, useState } from "react";

/** Background crosshair follower — normal OS cursor, lines in the scene */
export function CrosshairCursor() {
	const rootRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		const fine = window.matchMedia("(pointer: fine)").matches;
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (!fine || reduced) return;

		setActive(true);

		const move = (e: MouseEvent) => {
			const el = rootRef.current;
			if (el) {
				el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
			}
		};

		const onOver = (e: MouseEvent) => {
			const t = e.target;
			if (!(t instanceof Element)) return;
			const hit = t.closest(
				"a, button, [role='button'], input, select, textarea, label",
			);
			rootRef.current?.classList.toggle(
				"crosshair-bg--highlight",
				Boolean(hit),
			);
		};

		window.addEventListener("mousemove", move, { passive: true });
		document.addEventListener("mouseover", onOver, { passive: true });

		return () => {
			window.removeEventListener("mousemove", move);
			document.removeEventListener("mouseover", onOver);
		};
	}, []);

	if (!active) return null;

	return (
		<div className="crosshair-bg-layer" aria-hidden>
			<div ref={rootRef} className="crosshair-bg">
				<span className="crosshair-bg__line" />
				<span className="crosshair-bg__line" />
				<span className="crosshair-bg__line" />
				<span className="crosshair-bg__line" />
			</div>
		</div>
	);
}
