import { Hono } from "hono";
import applyBkndMiddleware from "../../../middleware/bknd";

const app = new Hono();

applyBkndMiddleware(app);

app.get("/*", (c) => c.var.app.fetch(c.req.raw));

export default app;
