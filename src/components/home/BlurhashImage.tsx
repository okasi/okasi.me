"use client";

import { decode } from "blurhash";
import { useEffect, useRef, useState } from "react";

const HASH = "eXKwbqk9_4WBE0xcRjV[oyR%M|M|M_axt7_3WUocagRjt8WUR$t7j]";
const FADE_MS = 1440;

export function BlurhashImage({
	src,
	alt,
	className = "",
}: {
	src: string;
	alt: string;
	className?: string;
}) {
	const imgRef = useRef<HTMLImageElement>(null);
	const [loaded, setLoaded] = useState(false);
	const [placeholderUrl, setPlaceholderUrl] = useState("");

	const markLoaded = () => setLoaded(true);

	useEffect(() => {
		try {
			const w = 32;
			const h = 32;
			const pixels = decode(HASH, w, h);
			const canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			const imageData = ctx.createImageData(w, h);
			imageData.data.set(pixels);
			ctx.putImageData(imageData, 0, 0);
			setPlaceholderUrl(canvas.toDataURL());
		} catch {
			setPlaceholderUrl("");
		}
	}, []);

	// Cached images often finish before onLoad is attached — check .complete
	useEffect(() => {
		const img = imgRef.current;
		if (!img) return;
		if (img.complete && img.naturalWidth > 0) {
			markLoaded();
			return;
		}
		const onReady = () => {
			if (img.naturalWidth > 0) markLoaded();
		};
		img.addEventListener("load", onReady);
		return () => img.removeEventListener("load", onReady);
	}, [src, markLoaded]);

	return (
		<div className={`relative h-full w-full overflow-hidden ${className}`}>
			{placeholderUrl && !loaded ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={placeholderUrl}
					alt=""
					aria-hidden
					className="absolute inset-0 h-full w-full scale-105 object-cover"
				/>
			) : null}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				ref={imgRef}
				src={src}
				alt={alt}
				loading="eager"
				fetchPriority="high"
				decoding="async"
				onLoad={markLoaded}
				onError={markLoaded}
				className="absolute inset-0 h-full w-full object-cover transition-opacity"
				style={{
					opacity: loaded ? 1 : 0,
					transitionDuration: `${FADE_MS}ms`,
				}}
			/>
		</div>
	);
}
