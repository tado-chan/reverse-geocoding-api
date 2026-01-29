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

// address_components の types から日本語名へのマッピング
const TYPE_LABELS: Record<string, string> = {
  country: "国",
  administrative_area_level_1: "都道府県",
  administrative_area_level_2: "市区町村（郡）",
  locality: "市区町村",
  sublocality_level_1: "区",
  sublocality_level_2: "町域",
  sublocality_level_3: "丁目",
  sublocality_level_4: "番地",
  premise: "建物名",
  postal_code: "郵便番号",
  street_number: "番地",
  route: "通り",
};

// 分解された住所情報の型
export interface ParsedAddress {
  formatted_address: string;
  components: {
    type: string;
    typeLabel: string;
    longName: string;
    shortName: string;
  }[];
  // よく使う項目を直接アクセスできるように
  country?: string;
  postalCode?: string;
  prefecture?: string; // 都道府県
  city?: string; // 市区町村
  ward?: string; // 区
  town?: string; // 町域
  chome?: string; // 丁目
  banchi?: string; // 番地
  building?: string; // 建物名
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

// address_components を分解して返す関数
export async function reverseGeocodeDetailed(
  latitude: number,
  longitude: number
): Promise<ParsedAddress | null> {
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

  const result = data.results[0];
  const parsed: ParsedAddress = {
    formatted_address: result.formatted_address,
    components: [],
  };

  // address_components を変換
  for (const comp of result.address_components) {
    const primaryType = comp.types[0]; // 最初の type を使用
    const typeLabel = TYPE_LABELS[primaryType] || primaryType;

    parsed.components.push({
      type: primaryType,
      typeLabel,
      longName: comp.long_name,
      shortName: comp.short_name,
    });

    // よく使う項目を直接セット
    switch (primaryType) {
      case "country":
        parsed.country = comp.long_name;
        break;
      case "postal_code":
        parsed.postalCode = comp.long_name;
        break;
      case "administrative_area_level_1":
        parsed.prefecture = comp.long_name;
        break;
      case "locality":
      case "administrative_area_level_2":
        parsed.city = comp.long_name;
        break;
      case "sublocality_level_1":
        parsed.ward = comp.long_name;
        break;
      case "sublocality_level_2":
        parsed.town = comp.long_name;
        break;
      case "sublocality_level_3":
        parsed.chome = comp.long_name;
        break;
      case "sublocality_level_4":
      case "street_number":
        parsed.banchi = comp.long_name;
        break;
      case "premise":
        parsed.building = comp.long_name;
        break;
    }
  }

  return parsed;
}
