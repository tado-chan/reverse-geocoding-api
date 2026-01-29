import { getDb } from "./db.js";
import { locations } from "./schema.js";
import { sql } from "drizzle-orm";

async function main() {
  console.log("🧪 Testing toDriver implementation...\n");

  const db = await getDb();

  // テーブルを作成
  console.log("📋 Creating table...");
  await db.execute(sql`DROP TABLE IF EXISTS locations`);
  await db.execute(sql`
    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      coordinates POINT NOT NULL
    )
  `);
  console.log("✅ Table created\n");

  // テスト1: toDriverを通る挿入（エラーが出るはず）
  console.log("Test 1: 直接オブジェクトを渡す（toDriverが呼ばれるはず）");
  try {
    await db.insert(locations).values({
      name: "テスト地点",
      coordinates: { lat: 35.6586, lon: 139.7454 },
    });
    console.log("❌ FAILED: エラーが投げられませんでした");
  } catch (err: any) {
    console.log("✅ SUCCESS: 期待通りエラーが投げられました");
    console.log(`   エラーメッセージ: ${err.message}\n`);
  }

  // テスト2: sqlテンプレートを使う挿入（成功するはず）
  console.log("Test 2: sqlテンプレートを使う（正しい方法）");
  try {
    const [insertResult] = await db.insert(locations).values({
      name: "東京タワー",
      coordinates: sql`ST_PointFromText('POINT(139.7454 35.6586)')`,
    });
    console.log(`✅ SUCCESS: 挿入成功 (ID: ${insertResult.insertId})`);

    // データを取得して確認
    const results = await db.select().from(locations);
    console.log(`   取得データ: ${JSON.stringify(results[0].coordinates)}\n`);
  } catch (err: any) {
    console.log(`❌ FAILED: ${err.message}\n`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
