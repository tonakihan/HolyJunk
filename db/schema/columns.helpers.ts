import * as p from "drizzle-orm/pg-core";

export const createdAt = p.timestamp("created_at").defaultNow().notNull();

export const timestamps = {
  createdAt,
  updatedAt: p.timestamp("updated_at"),
  deletedAt: p.timestamp("deleted_at"),
};
