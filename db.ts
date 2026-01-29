import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";

export async function getDb() {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "testuser",
    password: "testpassword",
    database: "testdb",
  });

  return drizzle(connection, { schema, mode: "default" });
}
