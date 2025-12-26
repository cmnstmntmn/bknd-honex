import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";
import { HTTPException } from "hono/http-exception";
import mainApp from "./sub-apps/main";

const edge = createApp();

const MAIN_HOSTS = new Set([
	"127.0.0.1",
	"staging.domzz.com",
	"profiles.domzz.com",
	"notifications.domzz.com",
	"domzz.com", // add staging / prod hosts here
]);

edge.use(async (c) => {
	const hostHeader = c.req.header("host");

	if (!hostHeader) {
		throw new HTTPException(400, {
			message: "Bad Request",
			cause: "Missing host header",
		});
	}

	const host = hostHeader.split(":")[0].toLowerCase();
	const isMainHost = MAIN_HOSTS.has(host);

	// main domain → mainApp
	if (isMainHost) {
		return mainApp.fetch(c.req.raw, c.env, c.executionCtx);
	}

	// clone request & inject header
	const headers = new Headers(c.req.raw.headers);
	headers.set("x-domain", host);

	const req = new Request(c.req.raw, { headers });

	// return profileApp.fetch(req, c.env, c.executionCtx);
});

showRoutes(edge);
console.log("----");
showRoutes(mainApp);

export default edge;

// import { Hono } from "hono";
// import { showRoutes } from "hono/dev";
// import { HTTPException } from "hono/http-exception";
// import mainApp from "./apps/main";
// import profileApp from "./apps/profile";
// import type { Env } from "./types/env";

// /**
//  * =====================================================
//  * CONTRACT
//  * =====================================================
//  * - edge decides which app handles the request
//  * - profileApp NEVER reads route params
//  * - username is passed ONLY via request headers
//  * - request headers are immutable → always clone
//  * - username ALWAYS includes "@"
//  */

// const edge = new Hono<Env>();

// const MAIN_HOSTS = new Set([
//   "127.0.0.1",
//   "staging.domzz.com",
//   "profiles.domzz.com",
//   "notifications.domzz.com",
//   "domzz.com", // add staging / prod hosts here
// ]);

// edge.use(async (c) => {
//   const hostHeader = c.req.header("host");

//   if (!hostHeader) {
//     throw new HTTPException(400, {
//       message: "Bad Request",
//       cause: "Missing host header",
//     });
//   }

//   const host = hostHeader.split(":")[0].toLowerCase();
//   const isMainHost = MAIN_HOSTS.has(host);

//   // main domain → mainApp
//   if (isMainHost) {
//     return mainApp.fetch(c.req.raw, c.env, c.executionCtx);
//   }

//   // clone request & inject header
//   const headers = new Headers(c.req.raw.headers);
//   headers.set("x-domain", host);

//   const req = new Request(c.req.raw, { headers });
//   return profileApp.fetch(req, c.env, c.executionCtx);
// });

// // edge.onError((err, c) => {
// //   if (err instanceof HTTPException) {
// //     return c.render(
// //       <>
// //         <h1>Edge - {err.message}</h1>
// //         <p>{err.cause}</p>
// //       </>,
// //     );
// //   }

// //   return c.render(<h1>Internal Server Error</h1>);
// // });

// /**
//  * -----------------------
//  * Debugging
//  * -----------------------
//  */
// showRoutes(profileApp, { verbose: false });
// showRoutes(mainApp, { verbose: false });

// export default edge;
