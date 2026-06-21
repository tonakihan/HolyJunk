import { getRequiredEnv, readSecretFile } from "@/utils/config";
import { loadEnvFile } from "process";
import { NODE_ENV } from "./env";

loadEnvFile(".env.db");

let dbUser, dbPassword: string;

if (NODE_ENV === "migration-db") {
  // ATTENTION: This only for migrations!
  // Do not use this for production!!!
  console.warn("[ATTENTION] USE DB_USER=postgres IS NOT SAFETY!!!");
  dbUser = "postgres";
} else {
  dbUser = getRequiredEnv("POSTGRES_USER");
}
console.info("DB_USER set to", dbUser);

dbPassword =
  dbUser === "postgres"
    ? readSecretFile("db_root_pass.secret")
    : readSecretFile("db_pass.secret");

const DB_USER = dbUser;
const DB_PASSWORD = dbPassword;
const DB_NAME: string = getRequiredEnv("POSTGRES_DB");
const DB_PORT: number = parseInt(process.env.DB_PORT ?? "5432");
const DB_HOST: string = process.env.DB_HOST ?? "localhost";
const DB_URL: string = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
console.log("DB_URL set to", DB_URL);

if (DB_PORT < 1 || DB_PORT > 65535) {
  throw new Error(`Invalid DB_PORT: ${process.env.DB_PORT}`);
}

export { DB_URL, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT };
