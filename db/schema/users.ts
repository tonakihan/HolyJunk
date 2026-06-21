import * as p from "drizzle-orm/pg-core";
import { createdAt, timestamps } from "./columns.helpers";

export const userRoleEnum = p.pgEnum("user_role", ["guest", "user", "admin"]);

export const users = p.pgTable(
  "users",
  {
    id: p.uuid().defaultRandom().primaryKey(),
    email: p.text().notNull().unique(),
    firstName: p.varchar("first_name", { length: 256 }),
    lastName: p.varchar("last_name", { length: 256 }),
    nickname: p.text().notNull(),
    role: userRoleEnum().default("guest").notNull(),
    // TODO: Made it
    avatarUrl: p.text("avatar_url"),
    ...timestamps,
  },
  (table) => [p.uniqueIndex("email_idx").on(table.email)],
);

// TODO Reputation
