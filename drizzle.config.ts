import { defineConfig } from "drizzle-kit";
import { DB_URL } from "./config/db";

export default defineConfig({
  schema: "./db/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
  },
});
