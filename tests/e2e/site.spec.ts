import { expect, type Page, test } from "@playwright/test";

const socialLinks = {
	GitHub: "https://github.com/okasi",
	LinkedIn: "https://www.linkedin.com/in/okasi",
	Telegram: "https://t.me/okasi_me",
	YouTube: "https://www.youtube.com/channel/UCoSvb8yzs5O1RzAlM24uU2Q",
	Twitter: "https://twitter.com/okasi_me",
	Instagram: "https://www.instagram.com/okasi.me/",
};

function captureErrors(page: Page) {
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));
	page.on("console", (message) => {
		if (message.type() === "error") errors.push(message.text());
	});
	return errors;
}

test("homepage renders every interactive feature without browser errors", async ({
	page,
}) => {
	const errors = captureErrors(page);
	await page.goto("/");

	await expect(page).toHaveTitle("Home | Oka Si");
	await expect(
		page.getByRole("heading", { level: 1, name: "Yoyoyo, I'm Oka Si" }),
	).toBeVisible();
	await expect(page.getByRole("link", { name: "Blog" })).toHaveAttribute(
		"href",
		"/blog",
	);

	const image = page.getByRole("img", { name: "Oka Si" });
	await expect(image).toBeVisible();
	await expect
		.poll(() =>
			image.evaluate(
				(element) =>
					element instanceof HTMLImageElement &&
					element.complete &&
					element.naturalWidth,
			),
		)
		.toBeGreaterThan(0);

	for (const [label, href] of Object.entries(socialLinks)) {
		await expect(page.getByRole("link", { name: label })).toHaveAttribute(
			"href",
			href,
		);
	}

	const favicon = page.locator("link[rel='icon'][href^='data:']");
	await expect(favicon).toHaveAttribute("href", /data:image\/svg\+xml/);
	const firstFavicon = await favicon.getAttribute("href");
	await page.waitForTimeout(100);
	expect(await favicon.getAttribute("href")).not.toBe(firstFavicon);

	await expect
		.poll(() =>
			page.locator("canvas").evaluate((canvas) => {
				if (!(canvas instanceof HTMLCanvasElement)) return 0;
				const pixels = canvas
					.getContext("2d")
					?.getImageData(0, 0, canvas.width, canvas.height).data;
				if (!pixels) return 0;
				for (let index = 0; index < pixels.length; index += 4) {
					if (pixels[index] || pixels[index + 1] || pixels[index + 2]) {
						return 1;
					}
				}
				return 0;
			}),
		)
		.toBe(1);

	await page.mouse.move(320, 240);
	await expect(page.locator(".crosshair")).toHaveCSS(
		"transform",
		"matrix(1, 0, 0, 1, 320, 240)",
	);
	expect(
		await page.evaluate(
			() =>
				document.documentElement.scrollWidth <=
				document.documentElement.clientWidth,
		),
	).toBe(true);
	expect(errors).toEqual([]);
});

test("idle mode updates and restores the overlay, title, and favicon", async ({
	page,
}) => {
	await page.clock.install();
	await page.goto("/");
	const originalTitle = await page.title();
	await expect(page.locator("link[rel='icon'][href^='data:']")).toHaveAttribute(
		"href",
		/data:image\/svg\+xml/,
	);

	await page.clock.fastForward(60_001);
	await expect(page.getByTestId("screensaver")).toBeVisible();
	await expect(page).toHaveTitle(new RegExp(`\\| ${originalTitle}$`));
	const favicon = page.locator("link[rel='icon'][href^='data:']");
	await expect(favicon).toHaveAttribute("href", /%F0%9F%98%B4/);

	await page.mouse.move(1, 1);
	await expect(page.getByTestId("screensaver")).toBeHidden();
	await expect(page).toHaveTitle(originalTitle);
	await page.clock.fastForward(50);
	await expect(favicon).not.toHaveAttribute("href", /%F0%9F%98%B4/);
});

test("blog navigation, search, theme persistence, and client cleanup work", async ({
	page,
}) => {
	const errors = captureErrors(page);
	await page.goto("/blog");

	await expect(
		page.getByRole("heading", { level: 1, name: "Blog" }),
	).toBeVisible();
	const postLink = page.locator(
		"article a[href='/blog/static-sites-that-feel-alive']",
	);
	await expect(postLink).toHaveAttribute(
		"href",
		"/blog/static-sites-that-feel-alive",
	);
	await expect(page.locator("html")).toHaveClass(/dark/);

	const themeToggle = page.getByRole("button", { name: "Toggle Theme" });
	await expect(themeToggle).toBeVisible();
	await themeToggle.click();
	await expect(page.locator("html")).not.toHaveClass(/dark/);
	expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(
		"light",
	);
	await page.reload();
	await expect(page.locator("html")).not.toHaveClass(/dark/);

	await page.locator("button[data-search-full]").click();
	await page.getByRole("textbox", { name: "Search" }).fill("static");
	await expect(
		page.getByRole("button", {
			name: "Blog Static sites that still feel alive",
		}),
	).toBeVisible();
	await page.getByRole("button", { name: "Close Search" }).click();

	await postLink.click();
	await expect(page).toHaveURL(/\/blog\/static-sites-that-feel-alive$/);
	await expect(
		page.getByRole("heading", {
			level: 1,
			name: "Static sites that still feel alive",
		}),
	).toBeVisible();
	await expect(page.locator("#nd-toc")).toContainText(
		"Keep the client boundary small",
	);

	await page.getByRole("link", { name: "Home", exact: true }).click();
	await expect(
		page.getByRole("heading", { level: 1, name: "Yoyoyo, I'm Oka Si" }),
	).toBeVisible();
	expect(
		await page.evaluate(() => ({
			scrollLocked: document.body.hasAttribute("data-scroll-locked"),
			sidebarOpen: document.body.hasAttribute("data-sidebar-open"),
			bodyOverflow: document.body.style.overflow,
			bodyPointerEvents: document.body.style.pointerEvents,
			htmlOverflow: document.documentElement.style.overflow,
			bodyBackground: getComputedStyle(document.body).backgroundColor,
			layoutVariables: [
				"--fd-sidebar-width",
				"--fd-toc-width",
				"--fd-sidebar-col",
				"--fd-docs-height",
				"--fd-header-height",
				"--fd-toc-popover-height",
			].map((name) => document.documentElement.style.getPropertyValue(name)),
		})),
	).toEqual({
		scrollLocked: false,
		sidebarOpen: false,
		bodyOverflow: "",
		bodyPointerEvents: "",
		htmlOverflow: "",
		bodyBackground: "rgb(0, 0, 0)",
		layoutVariables: ["", "", "", "", "", ""],
	});
	expect(errors).toEqual([]);
});

test("routes, API integration, redirects, and missing posts behave correctly", async ({
	request,
}) => {
	const search = await request.get("/api/search?query=static");
	expect(search.ok()).toBe(true);
	const searchResults = (await search.json()) as Array<{ id: string }>;
	expect(
		searchResults.some(
			(result) => result.id === "/blog/static-sites-that-feel-alive",
		),
	).toBe(true);
	expect(
		await (
			await request.get("/api/search?query=definitely-no-matching-post")
		).json(),
	).toEqual([]);

	const redirect = await request.get("/blog/ssg-with-sveltekit", {
		maxRedirects: 0,
	});
	expect(redirect.status()).toBe(308);
	expect(redirect.headers().location).toBe(
		"/blog/static-sites-that-feel-alive",
	);

	expect((await request.get("/blog/does-not-exist")).status()).toBe(404);
	expect((await request.get("/robots.txt")).status()).toBe(200);
	expect((await request.get("/favicon.ico")).status()).toBe(200);
	expect((await request.get("/apple-icon.png")).status()).toBe(200);
});

test.describe("mobile and reduced motion", () => {
	test.use({
		viewport: { width: 390, height: 844 },
		isMobile: true,
		hasTouch: true,
	});

	test("layouts remain contained and motion-only UI is disabled", async ({
		page,
	}) => {
		await page.emulateMedia({ reducedMotion: "reduce" });
		await page.goto("/");

		expect(
			await page.evaluate(
				() => matchMedia("(prefers-reduced-motion: reduce)").matches,
			),
		).toBe(true);
		expect(
			await page.evaluate(
				() =>
					document.documentElement.scrollWidth <=
					document.documentElement.clientWidth,
			),
		).toBe(true);
		await expect(page.locator(".crosshair-layer")).toHaveCSS("display", "none");
		await expect(page.locator(".home-intro")).toHaveCSS(
			"animation-name",
			"none",
		);

		await page.goto("/blog");
		expect(
			await page.evaluate(
				() =>
					document.documentElement.scrollWidth <=
					document.documentElement.clientWidth,
			),
		).toBe(true);
		await expect(
			page.getByRole("heading", { level: 1, name: "Blog" }),
		).toBeVisible();

		const sidebarToggle = page
			.locator("#nd-subnav")
			.getByRole("button", { name: "Open Sidebar" });
		await expect(sidebarToggle).toBeVisible();
		await sidebarToggle.click();
		const closeSidebar = page
			.locator("#nd-sidebar-mobile")
			.getByRole("button", { name: "Close Sidebar" });
		await expect(closeSidebar).toBeVisible();
		await closeSidebar.click();
		await expect(sidebarToggle).toBeVisible();
	});
});
