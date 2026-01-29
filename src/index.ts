import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { geocodeHandler } from "./handlers/geocode.js";
import { config } from "./config.js";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.json({
    message: "Reverse Geocoding API",
    usage: "GET /geocode/reverse?lat=35.6812&lng=139.7671",
    response: "{ lat, lng, address }",
  });
});

app.route("/geocode", geocodeHandler);

console.log(`Server running at http://localhost:${config.server.port}`);

serve({
  fetch: app.fetch,
  port: config.server.port,
});
