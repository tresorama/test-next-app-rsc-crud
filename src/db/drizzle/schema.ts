import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable('posts', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  status: text('status', { enum: ['published', 'draft'] }).default('draft').notNull(),
});
export type Post_Select = InferSelectModel<typeof posts>;
export type Post_Insert = InferInsertModel<typeof posts>;