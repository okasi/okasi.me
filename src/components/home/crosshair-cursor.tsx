"use client";

import { useEffect, useRef } from "react";

export function CrosshairCursor() {
	const crosshairRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (
			!window.matchMedia("(pointer: fine)").matches ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			return;
		}

		const move = ({ clientX, clientY }: PointerEvent) => {
			const crosshair = crosshairRef.current;
			if (crosshair) {
				crosshair.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
			}
		};

		window.addEventListener("pointermove", move, { passive: true });
		return () => window.removeEventListener("pointermove", move);
	}, []);

	return (
		<div className="crosshair-layer" aria-hidden>
			<div ref={crosshairRef} className="crosshair" />
		</div>
	);
}
