import { createApp } from "honox/server";

// import applyBaseMiddleware from "../middleware/base";
// import applyBkndMiddleware from "../middleware/bknd";
// import type { Env } from "../types/env";
// import profileApp from "./profile";
// import waitlistApp from "./waitlist";

const mainApp = createApp();

// applyBaseMiddleware(mainApp);
// applyBkndMiddleware(mainApp);

// Main app routes

// mainApp.route("/", waitlistApp);

// Profile on main app
// mainApp.route("/:username{@[a-z0-9_]+}", profileApp);

// Bknd
mainApp.all("/cevas", (c) => c.text("Something"));
// mainApp.all("/api/*", (c) => c.var.app.fetch(c.req.raw));
// mainApp.get("/admin/*", (c) => c.var.app.fetch(c.req.raw));

export default mainApp;
