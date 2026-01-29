#!/bin/bash

BASE_URL="${BASE_URL:-http://localhost:3000}"

echo "=== Reverse Geocoding API Test ==="
echo ""

# ルートエンドポイント確認
echo "1. GET / (API info)"
curl -s "$BASE_URL/" | jq .
echo ""

# 東京駅でテスト
echo "2. GET /geocode/reverse (Tokyo Station)"
curl -s "$BASE_URL/geocode/reverse?lat=35.6812&lng=139.7671" | jq .
echo ""

# POSTでDB保存テスト
echo "3. POST /geocode/reverse (Save to DB)"
curl -s -X POST "$BASE_URL/geocode/reverse" \
  -H "Content-Type: application/json" \
  -d '{"lat": 35.6812, "lng": 139.7671}' | jq .
echo ""

# 履歴取得
echo "4. GET /geocode/history"
curl -s "$BASE_URL/geocode/history" | jq .
echo ""

echo "=== Test Complete ==="
