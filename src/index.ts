import { Hono } from "hono";
import { randomColors } from "./utils/random-colors";
import { cors } from "hono/cors";
/**
 * @requires
 * If you are run on Bun you need to comment bellow line .
 * If you are run on Nodejs you need to uncomment bellow line.
 */
// import { serve } from "@hono/node-server";

const api = new Hono().basePath("/api");
api.use("*", cors());

api.get("/", (c) => {
  return c.text("Gradient maker API by Kavindu Manahara");
});

api.get("/random/:count?", async (c) => {
  return await randomColors(c);
});

const post = process.env.PORT || 9000;

/**
 * @requires
 * If you are run on Nodejs you need to comment bellow line .
 * If you are run on Bun you need to uncomment bellow line.
 */

export default {
  port: post,
  fetch: api.fetch,
};

/**
 * @requires
 * If you are run on Bun you need to comment bellow line .
 * If you are run on Nodejs you need to uncomment bellow line.
 */

// serve({
//   port: post,
//   fetch: app.fetch,
// })
