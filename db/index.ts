import { DB_URL } from "@/config/db";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(DB_URL);
