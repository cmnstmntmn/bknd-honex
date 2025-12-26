import { getFresh } from "bknd/adapter/cloudflare";
import type { Context } from "hono";
import config from "../config";
// import type { Env } from "../types/env";

export default async function createFreshClient(c: Context<Env>) {
	const { env, executionCtx, req } = c;

	// return "ceva";

	return getFresh(
		{
			bindings: () => ({ db: env.DB }),
			d1: { session: true, transport: "cookie" },
			...config,
		},
		{
			request: req.raw,
			env,
			ctx: executionCtx,
		},
	);
}
