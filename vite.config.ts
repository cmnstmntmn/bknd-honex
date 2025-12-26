import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";

import { defineConfig } from "vite";

export default defineConfig({
	ssr: {
		external: ["bknd"],
		// had to exclude bknd here, however i can't get it how it works.
		// bun run build then bun run preview -> /admin -> works .. and the index.js file is only 57KB
	},
	plugins: [
		honox({
			devServer: { adapter },
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
		tailwindcss(),
		build(),
	],
});
