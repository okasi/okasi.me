import type { ReactNode } from "react";
import { HomeRouteCleanup } from "@/components/home/HomeRouteCleanup";
import "./home.css";

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<div className="home-root home-page min-h-screen w-full min-w-0 bg-black text-white antialiased">
			<HomeRouteCleanup />
			{children}
		</div>
	);
}
