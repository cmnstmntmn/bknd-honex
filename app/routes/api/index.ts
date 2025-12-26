import { Hono } from "hono";
import applyBkndMiddleware from "../../../middleware/bknd";

const app = new Hono();

applyBkndMiddleware(app);

app.all("/*", (c) => c.var.app.fetch(c.req.raw));

export default app;
