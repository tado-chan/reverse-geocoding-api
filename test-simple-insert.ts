import { getDb } from "./db.js";
import { locations } from "./schema.js";
import { sql } from "drizzle-orm";

async function main() {
  console.log("🧪 Testing simple insert with toDriver...\n");

  const db = await getDb();

  // テーブルを作成
  console.log("📋 Creating table...");
  await db.execute(sql`DROP TABLE IF EXISTS locations`);
  await db.execute(sql`
    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      coordinates POINT NOT NULL SRID 4326
    )
  `);
  console.log("✅ Table created\n");

  // シンプルな書き方でインサートを試す
  console.log("Test: シンプルなオブジェクトを直接渡す");
  try {
    const [insertResult] = await db.insert(locations).values({
      name: "東京タワー",
      coordinates: { latitude: 35.6586, longitude: 139.7454 },
    });
    console.log(`✅ SUCCESS: 挿入成功 (ID: ${insertResult.insertId})`);

    // データを取得して確認
    const results = await db.select().from(locations);
    console.log(`   取得データ: ${JSON.stringify(results[0])}\n`);

    if (results[0].coordinates!.latitude === 35.6586 && results[0].coordinates!.longitude === 139.7454) {
      console.log("✅ 完璧！toDriverが動作しています！");
      console.log("   これで実装がめちゃくちゃ楽になります！");
    }
  } catch (err: any) {
    console.log(`❌ FAILED: ${err.message}\n`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
