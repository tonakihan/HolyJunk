import * as p from "drizzle-orm/pg-core";
import { users } from "./users";
import { createdAt } from "./columns.helpers";

export const follows = p.pgTable(
  "follows",
  {
    followerId: p
      .uuid("follower_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followingId: p
      .uuid("following_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt,
  },
  (table) => [p.primaryKey({ columns: [table.followerId, table.followingId] })],
);
