import { GOOGLE_MAPS_API_KEY } from "../config.js";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface ReverseGeocodeResponse {
  results: Array<{
    formatted_address: string;
    place_id: string;
    address_components: AddressComponent[];
  }>;
  status: string;
  error_message?: string;
}

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<string | null> {
  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("latlng", `${latitude},${longitude}`);
  url.searchParams.set("key", GOOGLE_MAPS_API_KEY);
  url.searchParams.set("language", "ja");

  const response = await fetch(url.toString());
  const data = (await response.json()) as ReverseGeocodeResponse;

  if (data.status !== "OK" || data.results.length === 0) {
    console.error("Geocoding API error:", data.status, data.error_message);
    return null;
  }

  return data.results[0].formatted_address;
}
