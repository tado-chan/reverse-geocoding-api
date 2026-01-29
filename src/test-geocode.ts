// リバースジオコーディングAPIのテスト
// 使い方: npm run test:api

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

async function main() {
  console.log("=== リバースジオコーディング テスト ===");

  // 東京駅
  await testReverseGeocode(35.6812, 139.7671, "東京駅");

  // 大阪城
  await testReverseGeocode(34.6873, 135.5262, "大阪城");

  // 富士山
  await testReverseGeocode(35.3606, 138.7274, "富士山");

  console.log("\n=== テスト完了 ===\n");
}

main();
