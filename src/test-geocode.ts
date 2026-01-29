// リバースジオコーディングAPIのテスト
// 使い方: npm run test:api

import { reverseGeocodeDetailed, ParsedAddress } from "./services/geocode.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

interface GeocodeResponse {
  lat: number;
  lng: number;
  address: string;
  error?: string;
}

async function testReverseGeocode(lat: number, lng: number, label: string) {
  console.log(`\n[${label}]`);
  console.log(`座標: ${lat}, ${lng}`);

  try {
    const res = await fetch(`${BASE_URL}/geocode/reverse?lat=${lat}&lng=${lng}`);
    const data = (await res.json()) as GeocodeResponse;

    if (data.error) {
      console.log(`エラー: ${data.error}`);
    } else {
      console.log(`住所: ${data.address}`);
    }
  } catch (e) {
    console.log(`接続エラー: サーバーが起動していることを確認してください`);
  }
}

// address_components の詳細を表示するテスト
async function testAddressComponents(lat: number, lng: number, label: string) {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`[${label}] - 住所コンポーネント詳細`);
  console.log(`座標: ${lat}, ${lng}`);
  console.log("=".repeat(50));

  const result = await reverseGeocodeDetailed(lat, lng);

  if (!result) {
    console.log("エラー: 住所を取得できませんでした");
    return;
  }

  console.log(`\n【整形済み住所】`);
  console.log(`  ${result.formatted_address}`);

  console.log(`\n【よく使う項目】`);
  console.log(`  国:       ${result.country || "-"}`);
  console.log(`  郵便番号: ${result.postalCode || "-"}`);
  console.log(`  都道府県: ${result.prefecture || "-"}`);
  console.log(`  市区町村: ${result.city || "-"}`);
  console.log(`  区:       ${result.ward || "-"}`);
  console.log(`  町域:     ${result.town || "-"}`);
  console.log(`  丁目:     ${result.chome || "-"}`);
  console.log(`  番地:     ${result.banchi || "-"}`);
  console.log(`  建物名:   ${result.building || "-"}`);

  console.log(`\n【address_components 全データ】`);
  console.log("-".repeat(50));
  for (const comp of result.components) {
    const label = (comp.typeLabel || comp.type || "不明").padEnd(12);
    console.log(`  ${label} (${comp.type})`);
    console.log(`    long_name:  ${comp.longName}`);
    console.log(`    short_name: ${comp.shortName}`);
    console.log("");
  }
}

async function main() {
  console.log("\n\n");
  console.log("╔════════════════════════════════════════════════════╗");
  console.log("║    address_components 詳細テスト                   ║");
  console.log("╚════════════════════════════════════════════════════╝");

  // 東京駅
  await testAddressComponents(35.6812, 139.7671, "東京駅");

  // 大阪城
  await testAddressComponents(34.6873, 135.5262, "大阪城");

  // 富士山
  await testAddressComponents(35.3606, 138.7274, "富士山");

  console.log("\n=== テスト完了 ===\n");
}

main();
