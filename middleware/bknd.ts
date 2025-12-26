import type { Hono } from "hono";
import createFreshClient from "../lib/bknd";
// import type { Env } from "../types/env";

export default function applyBkndMiddleware(app: Hono) {
	app.use("*", async (c, next) => {
		const fresh = await createFreshClient(c);

		console.log("--->", fresh);

		c.set("app", fresh);
		// c.set("appApi", fresh.getApi({ token: c.env.APP_SERVICE_TOKEN }));
		c.set("api", fresh.getApi(c.req.raw));

		await next();
	});
}
