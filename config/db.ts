import { getRequiredEnv, readSecretFile } from "@/utils/config";
import { loadEnvFile } from "process";

loadEnvFile(".env.db");

const DB_USER: string = getRequiredEnv("POSTGRES_USER");
const DB_PASSWORD = await readSecretFile("db_pass.secret");
const DB_NAME: string = getRequiredEnv("POSTGRES_DB");
const DB_PORT: number = parseInt(process.env.DB_PORT ?? "5432");
const DB_HOST: string = process.env.DB_HOST ?? "localhost";
const DB_URL: string = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

if (DB_PORT < 1 || DB_PORT > 65535) {
  throw new Error(`Invalid DB_PORT: ${process.env.DB_PORT}`);
}

export { DB_URL, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT };
