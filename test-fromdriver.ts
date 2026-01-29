import { getDb } from "./db.js";
import { locations } from "./schema.js";
import { sql } from "drizzle-orm";

async function main() {
  console.log("🧪 Testing fromDriver (取得時の変換) ...\n");

  const db = await getDb();

  // テーブルを作成
  await db.execute(sql`DROP TABLE IF EXISTS locations`);
  await db.execute(sql`
    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      latitude DOUBLE NULL,
      longitude DOUBLE NULL,
      coordinates POINT AS (ST_SRID(POINT(COALESCE(longitude, 0.0), COALESCE(latitude, 0.0)), 4326)) STORED NOT NULL SRID 4326,
      SPATIAL INDEX (coordinates)
    )
  `);

  // テストデータ
  const testLocations = [
    { name: "東京タワー", lat: 35.6586, lon: 139.7454 },
    { name: "大阪城", lat: 34.6873, lon: 135.5262 },
    { name: "札幌時計台", lat: 43.0642, lon: 141.3535 },
  ];

  console.log("📝 挿入するデータ:");
  testLocations.forEach(loc => {
    console.log(`   ${loc.name}: lat=${loc.lat}, lon=${loc.lon}`);
  });
  console.log();

  // データを挿入（生成列なのでlatitude/longitudeに挿入）
  for (const loc of testLocations) {
    await db.execute(sql`
      INSERT INTO locations (name, latitude, longitude)
      VALUES (${loc.name}, ${loc.lat}, ${loc.lon})
    `);
  }
  console.log("✅ 挿入完了\n");

  // mysql2の生の返り値を確認
  console.log("🔬 mysql2の生のPOINT値を確認:");
  const [rawPoint] = await db.execute(sql`SELECT coordinates FROM locations LIMIT 1`);
  console.log(`   mysql2が返す値: ${JSON.stringify((rawPoint as any[])[0].coordinates)}`);
  console.log();

  // Drizzle ORMで取得（fromDriverが使われる）
  console.log("📖 Drizzle ORMで取得（fromDriverを通る）:");
  const results = await db.select().from(locations);
  results.forEach(row => {
    console.log(`   ${row.name}: lat=${row.coordinates!.lat}, lon=${row.coordinates!.lon}`);
  });
  console.log();

  // 生のSQLで検証
  // SRID 4326の場合、ST_Longitude/ST_Latitudeを使う
  console.log("🔍 生のSQLで検証:");
  const [rawResults] = await db.execute(sql`
    SELECT
      name,
      ST_Longitude(coordinates) as lon,
      ST_Latitude(coordinates) as lat
    FROM locations
  `);

  (rawResults as any[]).forEach(row => {
    console.log(`   ${row.name}: lat=${row.lat}, lon=${row.lon}`);
  });
  console.log();

  // 検証
  console.log("✨ 検証結果:");
  let allMatch = true;

  for (let i = 0; i < testLocations.length; i++) {
    const original = testLocations[i];
    const retrieved = results[i];
    const raw = (rawResults as any[])[i];

    const latMatch = Math.abs(retrieved.coordinates!.lat - original.lat) < 0.0001;
    const lonMatch = Math.abs(retrieved.coordinates!.lon - original.lon) < 0.0001;
    const rawLatMatch = Math.abs(raw.lat - original.lat) < 0.0001;
    const rawLonMatch = Math.abs(raw.lon - original.lon) < 0.0001;

    console.log(`\n   ${original.name}:`);
    console.log(`     元データ:        lat=${original.lat}, lon=${original.lon}`);
    console.log(`     Drizzle取得:     lat=${retrieved.coordinates!.lat}, lon=${retrieved.coordinates!.lon}`);
    console.log(`     生SQL取得:       lat=${raw.lat}, lon=${raw.lon}`);

    if (latMatch && lonMatch && rawLatMatch && rawLonMatch) {
      console.log(`     ✅ 一致！fromDriverは正しい`);
    } else {
      console.log(`     ❌ 不一致！`);
      if (!latMatch) console.log(`        - 緯度が違う (Drizzle)`);
      if (!lonMatch) console.log(`        - 経度が違う (Drizzle)`);
      if (!rawLatMatch) console.log(`        - 緯度が違う (生SQL)`);
      if (!rawLonMatch) console.log(`        - 経度が違う (生SQL)`);
      allMatch = false;
    }
  }

  console.log();
  if (allMatch) {
    console.log("🎉 SUCCESS: fromDriverの実装は完璧に正しいです！");
    console.log("   { lat: value.y, lon: value.x } が正しい変換です。");
  } else {
    console.log("❌ FAILED: fromDriverの実装に問題があります！");
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
