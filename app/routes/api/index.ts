import { Hono } from "hono";
import applyBkndMiddleware from "../../../middleware/bknd";

const app = new Hono();

applyBkndMiddleware(app);

// matches `/about/:name`
app.all("/*", (c) => {
	console.log(c.get("app"));

	return c.json({
		"your name is": "name",
	});
});

export default app;
