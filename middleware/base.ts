import type { Hono } from "hono";
import { csrf } from "hono/csrf";
import { languageDetector } from "hono/language";
import { trimTrailingSlash } from "hono/trailing-slash";

export default function applyBaseMiddleware(app: Hono) {
	app
		.use(trimTrailingSlash())
		.use(csrf())
		.use(
			languageDetector({
				supportedLanguages: ["en", "es", "de", "it", "nl", "zh"],
				fallbackLanguage: "en",
			}),
		);
}
