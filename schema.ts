import { mysqlTable, serial, varchar, customType } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

interface PointValue {
  latitude: number;
  longitude: number;
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
    // mysql2が { x: longitude, y: latitude } を返す
    return { longitude: value.x, latitude: value.y };
  },

  toDriver(value: PointValue) {
    // SRID 4326のデフォルトは (lat lon) の順序
    return sql`ST_GeomFromText('POINT(${value.latitude} ${value.longitude})', 4326)`;
  },
});

export const locations = mysqlTable("locations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  coordinates: point("coordinates"),
});
