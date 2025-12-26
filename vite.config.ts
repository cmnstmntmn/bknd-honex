import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";


import { defineConfig } from "vite";

export default defineConfig({
	ssr: {
		external: ["bknd"], // -- had do put these here to make it work
	},
	optimizeDeps: {
		exclude: ["bknd"],
	},
	plugins: [
	  // ssrPlugin(),
		honox({
			devServer: { adapter },
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
		tailwindcss(),
		build(),
	],
});
