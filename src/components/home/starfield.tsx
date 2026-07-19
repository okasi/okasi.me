"use client";

import { useEffect, useRef } from "react";

type Star = {
	x: number;
	y: number;
	z: number;
	size: number;
	speed: number;
};

const STAR_COUNT = 200;
const STAR_DEPTH = 1000;

function createStar(
	width: number,
	height: number,
	z = Math.random() * STAR_DEPTH + 1,
): Star {
	return {
		x: Math.random() * width - width / 2,
		y: Math.random() * height - height / 2,
		z,
		size: Math.random() * 1.5 + 0.5,
		speed: Math.random() * 0.5 + 0.1,
	};
}

export function Starfield() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (!canvas || !context) return;

		let frame = 0;
		let stars: Star[] = [];
		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			stars = Array.from({ length: STAR_COUNT }, () =>
				createStar(canvas.width, canvas.height),
			);
		};

		const draw = (advance: boolean) => {
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;

			context.fillStyle = "#000";
			context.fillRect(0, 0, canvas.width, canvas.height);

			for (const star of stars) {
				if (advance) star.z -= star.speed;
				if (star.z <= 0)
					Object.assign(
						star,
						createStar(canvas.width, canvas.height, STAR_DEPTH),
					);

				const scale = 300 / star.z;
				const x = centerX + star.x * scale;
				const y = centerY + star.y * scale;
				if (Math.hypot(x - centerX, y - centerY) < 8) continue;

				const alpha =
					Math.min(1, (STAR_DEPTH - star.z) / STAR_DEPTH) * 0.8 + 0.2;
				const size = Math.max(0.5, Math.min(star.size * scale, 3));
				context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
				context.fillRect(x - size / 2, y - size / 2, size, size);
			}
		};

		const animate = () => {
			draw(true);
			frame = window.requestAnimationFrame(animate);
		};

		const handleResize = () => {
			resize();
			if (reducedMotion) draw(false);
		};

		resize();
		if (reducedMotion) draw(false);
		else animate();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 z-0 size-full bg-black"
			aria-hidden
		/>
	);
}
