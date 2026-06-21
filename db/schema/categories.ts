import { type AnyPgColumn } from "drizzle-orm/pg-core";
import * as p from "drizzle-orm/pg-core";

export const categories = p.pgTable("categories", {
  id: p.serial().primaryKey(),
  name: p.text().notNull(),

  /**
   * For URL & SEO
  @example "men-shoes
  */
  slug: p.text().notNull().unique(),

  /** For sub categories */
  parentId: p
    .integer("parent_id")
    .references((): AnyPgColumn => categories.id, {
      onDelete: "cascade",
    }),
});
