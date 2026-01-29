# Drizzle ORM MySQL POINT型検証プロジェクト

このプロジェクトは、Drizzle ORMでMySQLのPOINT型を扱うためのカスタムタイプ実装を検証します。

## 構成

- `schema.ts` - カスタムPOINT型の定義とテーブルスキーマ
- `db.ts` - データベース接続設定
- `test.ts` - POINT型の挿入・取得テスト
- `docker-compose.yml` - MySQL 8.0のDocker設定
- `tsconfig.json` - TypeScript設定

## セットアップ

### 1. MySQLコンテナを起動

```bash
docker-compose up -d
```

MySQLが完全に起動するまで数秒待ちます。

### 2. 依存パッケージをインストール（既にインストール済み）

```bash
npm install
```

## テストの実行

```bash
npm test
```

## 何がテストされるか

このテストは以下を検証します：

1. **toDriver関数**: `{ lat, lon }` → `{ x, y }` の変換が正しいか
2. **fromDriver関数**: `{ x, y }` → `{ lat, lon }` の変換が正しいか
3. **データの整合性**: 挿入したデータが正確に取得できるか

テストは以下の手順で実行されます：

1. locationsテーブルを作成
2. 東京タワーの座標（lat: 35.6586, lon: 139.7454）を挿入
3. Drizzle ORMでデータを取得
4. 生のSQLでデータを取得
5. 両方の結果を比較して検証

## 期待される出力

成功した場合：

```
✅ SUCCESS: toDriver implementation is correct!
   The data was stored and retrieved correctly.
```

## カスタムPOINT型の実装

```typescript
interface PointValue {
  lat: number;
  lon: number;
}

interface MySQLPoint {
  x: number;
  y: number;
}

export const point = customType<{ data: PointValue; driverData: MySQLPoint }>({
  dataType() {
    return `point`;
  },

  fromDriver(value: MySQLPoint): PointValue {
    // mysql2が { x, y } を返す
    return { lat: value.y, lon: value.x };
  },

  toDriver(value: PointValue): MySQLPoint {
    // mysql2に { x, y } を渡す
    return { x: value.lon, y: value.lat };
  },
});
```

### 重要なポイント

- MySQLのPOINT型は内部的に `(X, Y)` の順序で保存されます
- 地理座標系では X = 経度(longitude), Y = 緯度(latitude)
- `toDriver`: アプリケーションの `{ lat, lon }` をMySQLの `{ x: lon, y: lat }` に変換
- `fromDriver`: MySQLの `{ x, y }` をアプリケーションの `{ lat: y, lon: x }` に変換

## クリーンアップ

```bash
docker-compose down -v
```

これでMySQLコンテナとボリュームが削除されます。
