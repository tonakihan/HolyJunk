import * as p from "drizzle-orm/pg-core";
import { users } from "./users";
import { categories } from "./categories";
import { timestamps } from "./columns.helpers";

export const itemStatusEnum = p.pgEnum("item_status", [
  "draft",
  "active",
  "reserved",
  "sold",
  "archived",
]);
export const itemConditionEnum = p.pgEnum("item_condition", [
  "new",
  "like_new",
  "good",
  "fair",
]);
export const itemCurrencyEnum = p.pgEnum("item_currency", ["RUB", "USD"]);

export const items = p.pgTable("items", {
  id: p.uuid().defaultRandom().primaryKey(),
  sellerId: p
    .uuid("seller_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  categoryId: p
    .integer("category_id")
    .notNull()
    .references(() => categories.id),
  title: p.text().notNull(),
  description: p.text(),

  /** В копейках/центах как integer */
  price: p.integer().notNull(),
  currency: itemCurrencyEnum().default("RUB").notNull(),

  status: itemStatusEnum().default("active").notNull(),
  condition: itemConditionEnum().notNull(),

  // TODO: Replace me in the future
  // JSONB-field for any characteristics. NOTICE: (validation via Zod)
  attributes: p.jsonb().$type<Record<string, any>>().default({}).notNull(),

  viewsCount: p.integer("views_count").default(0).notNull(),
  ...timestamps,
});
