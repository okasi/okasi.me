"use client";

import { useEffect, useRef } from "react";

interface Star {
	x: number;
	y: number;
	z: number;
	size: number;
	speed: number;
}

export function Starfield() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const starsRef = useRef<Star[]>([]);
	const animationRef = useRef(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const starCount = 200;
		starsRef.current = [];
		for (let i = 0; i < starCount; i++) {
			starsRef.current.push({
				x: Math.random() * canvas.width - canvas.width / 2,
				y: Math.random() * canvas.height - canvas.height / 2,
				z: Math.random() * 1000,
				size: Math.random() * 1.5 + 0.5,
				speed: Math.random() * 0.5 + 0.1,
			});
		}

		const animate = () => {
			ctx.fillStyle = "rgb(0, 0, 0)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;

			for (const star of starsRef.current) {
				star.z -= star.speed;

				if (star.z <= 0) {
					star.x = Math.random() * canvas.width - centerX;
					star.y = Math.random() * canvas.height - centerY;
					star.z = 1000;
					star.size = Math.random() * 1.5 + 0.5;
					star.speed = Math.random() * 0.5 + 0.1;
				}

				const scale = 300 / star.z;
				const x = centerX + star.x * scale;
				const y = centerY + star.y * scale;

				const distFromCenter = Math.sqrt(
					(x - centerX) ** 2 + (y - centerY) ** 2,
				);
				if (distFromCenter < 8) continue;

				const brightness = Math.min(1, (1000 - star.z) / 1000);
				const alpha = brightness * 0.8 + 0.2;

				const projectedSize = Math.min(star.size * scale, 3);
				const size = Math.max(0.5, projectedSize);
				ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
				ctx.fillRect(x - size / 2, y - size / 2, size, size);
			}

			animationRef.current = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			cancelAnimationFrame(animationRef.current);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 h-full w-full"
			style={{ background: "black", zIndex: 0 }}
			aria-hidden
		/>
	);
}
