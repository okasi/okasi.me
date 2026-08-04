"use client";

import { useEffect, useState } from "react";

type BlogTimestampsProps = {
	published?: Date | string;
	updated?: Date | string;
	className?: string;
};

function toIso(value?: Date | string) {
	if (!value) return undefined;
	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) return undefined;
	return date.toISOString();
}

function cityFromTimeZone(timeZone: string) {
	const segment = timeZone.split("/").pop() ?? timeZone;
	return segment.replaceAll("_", " ");
}

/** e.g. "4 August 2026, 12:18 · CEST / Stockholm (GMT+2)" */
function formatLocal(iso?: string) {
	if (!iso) return null;

	const date = new Date(iso);
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const city = cityFromTimeZone(timeZone);

	const dateTimeParts = new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone,
	}).formatToParts(date);

	const dateText = [
		dateTimeParts.find((p) => p.type === "day")?.value,
		dateTimeParts.find((p) => p.type === "month")?.value,
		dateTimeParts.find((p) => p.type === "year")?.value,
	]
		.filter(Boolean)
		.join(" ");

	const hour = dateTimeParts.find((p) => p.type === "hour")?.value;
	const minute = dateTimeParts.find((p) => p.type === "minute")?.value;
	const timeText = hour && minute ? `${hour}:${minute}` : "";

	const shortName =
		new Intl.DateTimeFormat(undefined, {
			timeZone,
			timeZoneName: "short",
		})
			.formatToParts(date)
			.find((p) => p.type === "timeZoneName")?.value ?? "";

	const longOffset =
		new Intl.DateTimeFormat(undefined, {
			timeZone,
			timeZoneName: "longOffset",
		})
			.formatToParts(date)
			.find((p) => p.type === "timeZoneName")?.value ?? "";

	// "GMT+02:00" → "GMT+2"; keep "GMT" / "UTC" as-is
	const gmtHint = longOffset.replace(/^GMT([+-])0?(\d+)(?::00)?$/, "GMT$1$2");

	// Prefer named abbr (CET/CEST) over raw GMT when shortName is already GMT*
	const abbr =
		shortName && !/^GMT/i.test(shortName) && !/^UTC$/i.test(shortName)
			? shortName
			: city
				? undefined
				: shortName || undefined;

	const zoneLabel = [abbr, city].filter(Boolean).join(" / ");
	const withOffset =
		zoneLabel && gmtHint && !zoneLabel.includes(gmtHint)
			? `${zoneLabel} (${gmtHint})`
			: zoneLabel || gmtHint;

	return (
		[dateText, timeText].filter(Boolean).join(", ") +
		(withOffset ? ` · ${withOffset}` : "")
	);
}

function TimestampLine({
	label,
	iso,
	text,
}: {
	label: string;
	iso: string;
	text: string | null;
}) {
	return (
		<p>
			<span className="text-fd-muted-foreground/80">{label}</span>{" "}
			<time dateTime={iso} suppressHydrationWarning>
				{text ?? "…"}
			</time>
		</p>
	);
}

export function BlogTimestamps({
	published,
	updated,
	className,
}: BlogTimestampsProps) {
	const publishedIso = toIso(published);
	const updatedIso = toIso(updated);
	const [publishedText, setPublishedText] = useState<string | null>(null);
	const [updatedText, setUpdatedText] = useState<string | null>(null);

	useEffect(() => {
		setPublishedText(formatLocal(publishedIso));
		setUpdatedText(formatLocal(updatedIso));
	}, [publishedIso, updatedIso]);

	if (!publishedIso && !updatedIso) return null;

	return (
		<div
			className={
				className ?? "-mt-2 mb-4 space-y-1 text-sm text-fd-muted-foreground"
			}
		>
			{publishedIso ? (
				<TimestampLine
					label="Published"
					iso={publishedIso}
					text={publishedText}
				/>
			) : null}
			{updatedIso && updatedIso !== publishedIso ? (
				<TimestampLine
					label="Last edited"
					iso={updatedIso}
					text={updatedText}
				/>
			) : null}
		</div>
	);
}
