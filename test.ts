import { getDb } from "./db.js";
import { locations } from "./schema.js";
import { sql } from "drizzle-orm";

async function main() {
  console.log("🚀 Starting POINT type verification test...\n");

  const db = await getDb();

  // テーブルを削除して再作成
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

  // テストデータ: 東京タワーの座標
  const testData = {
    name: "東京タワー",
    coordinates: { lat: 35.6586, lon: 139.7454 },
  };

  console.log("📝 Inserting test data:");
  console.log(`   Name: ${testData.name}`);
  console.log(`   Latitude: ${testData.coordinates.lat}`);
  console.log(`   Longitude: ${testData.coordinates.lon}\n`);

  // Drizzle ORMを使ってデータを挿入
  // 注意: POINT型の挿入にはST_PointFromText()関数が必要
  const [insertResult] = await db.insert(locations).values({
    name: testData.name,
    coordinates: sql`ST_PointFromText('POINT(${testData.coordinates.lon} ${testData.coordinates.lat})')`,
  });
  console.log(`✅ Inserted with ID: ${insertResult.insertId}\n`);

  // Drizzle ORMを使ってデータを取得
  console.log("📖 Reading data with Drizzle ORM:");
  const results = await db.select().from(locations);
  console.log("   Results:", JSON.stringify(results, null, 2));
  console.log();

  // 生のSQLで検証
  console.log("🔍 Verifying with raw SQL:");
  const [rawResults] = await db.execute(
    sql`SELECT
      id,
      name,
      ST_X(coordinates) as longitude,
      ST_Y(coordinates) as latitude,
      ST_AsText(coordinates) as wkt
    FROM locations`
  );
  console.log("   Raw SQL Results:", JSON.stringify(rawResults, null, 2));
  console.log();

  // 検証
  console.log("✨ Verification:");
  const retrieved = results[0];
  const raw = rawResults[0] as any;

  console.log("   Original data:");
  console.log(`     lat: ${testData.coordinates.lat}, lon: ${testData.coordinates.lon}`);
  console.log();

  console.log("   Retrieved via Drizzle:");
  console.log(`     lat: ${retrieved.coordinates.lat}, lon: ${retrieved.coordinates.lon}`);
  console.log();

  console.log("   Retrieved via raw SQL:");
  console.log(`     lat: ${raw.latitude}, lon: ${raw.longitude}`);
  console.log(`     WKT: ${raw.wkt}`);
  console.log();

  // 正確性チェック
  const latMatch = Math.abs(retrieved.coordinates.lat - testData.coordinates.lat) < 0.0001;
  const lonMatch = Math.abs(retrieved.coordinates.lon - testData.coordinates.lon) < 0.0001;
  const rawLatMatch = Math.abs(raw.latitude - testData.coordinates.lat) < 0.0001;
  const rawLonMatch = Math.abs(raw.longitude - testData.coordinates.lon) < 0.0001;

  if (latMatch && lonMatch && rawLatMatch && rawLonMatch) {
    console.log("✅ SUCCESS: toDriver implementation is correct!");
    console.log("   The data was stored and retrieved correctly.");
  } else {
    console.log("❌ FAILED: Data mismatch detected!");
    if (!latMatch) console.log(`   - Latitude mismatch via Drizzle`);
    if (!lonMatch) console.log(`   - Longitude mismatch via Drizzle`);
    if (!rawLatMatch) console.log(`   - Latitude mismatch via raw SQL`);
    if (!rawLonMatch) console.log(`   - Longitude mismatch via raw SQL`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
