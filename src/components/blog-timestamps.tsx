"use client";

import { useEffect, useState } from "react";

type BlogTimestampsProps = {
	published?: Date | string;
	updated?: Date | string;
	className?: string;
};

const localDateTimeFormatter = new Intl.DateTimeFormat(undefined, {
	year: "numeric",
	month: "long",
	day: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	timeZoneName: "short",
});

function toIso(value?: Date | string) {
	if (!value) return undefined;
	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) return undefined;
	return date.toISOString();
}

function formatLocal(iso?: string) {
	if (!iso) return null;
	return localDateTimeFormatter.format(new Date(iso));
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
