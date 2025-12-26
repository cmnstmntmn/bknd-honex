import { Hono } from "hono";

const app = new Hono();

// matches `/about/:name`
app.all("*", (c) => {
	const name = c.req.param("name");
	return c.json({
		"your name is": name,
	});
});

export default app;
