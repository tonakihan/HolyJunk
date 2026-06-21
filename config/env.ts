import { loadEnvFile } from "process";

loadEnvFile(".env");
loadEnvFile(".env.local");

const NODE_ENV: "production" | "development" | "test" | "migration-db" =
  process.env.NODE_ENV || "production";

console.info("NODE_ENV set to", NODE_ENV);

export { NODE_ENV };
