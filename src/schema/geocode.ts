import { z } from "zod";

export const reverseGeocodeQuerySchema = z.object({
  lat: z
    .string()
    .transform((v) => parseFloat(v))
    .refine((v) => !isNaN(v), { message: "lat must be a valid number" })
    .refine((v) => v >= -90 && v <= 90, { message: "lat must be between -90 and 90" }),
  lng: z
    .string()
    .transform((v) => parseFloat(v))
    .refine((v) => !isNaN(v), { message: "lng must be a valid number" })
    .refine((v) => v >= -180 && v <= 180, { message: "lng must be between -180 and 180" }),
});

export type ReverseGeocodeQuery = z.infer<typeof reverseGeocodeQuerySchema>;
