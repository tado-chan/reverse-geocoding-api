import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { reverseGeocodeQuerySchema } from "../schema/geocode.js";
import { reverseGeocode } from "../services/geocode.js";

const geocodeHandler = new Hono();

// GET /geocode/reverse?lat=35.6812&lng=139.7671
geocodeHandler.get(
  "/reverse",
  zValidator("query", reverseGeocodeQuerySchema),
  async (c) => {
    const { lat, lng } = c.req.valid("query");

    const address = await reverseGeocode(lat, lng);

    if (!address) {
      return c.json({ error: "Failed to get address" }, 500);
    }

    return c.json({ lat, lng, address });
  }
);

export { geocodeHandler };
