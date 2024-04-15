import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { sqliteTableCreator, text, integer } from "drizzle-orm/sqlite-core";

const createTable = sqliteTableCreator((name: string) => `prefix_${name}`);

export const posts = createTable('posts', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  status: text('status', { enum: ['published', 'draft'] }).default('draft').notNull(),
});
export type Post_Select = InferSelectModel<typeof posts>;
export type Post_Insert = InferInsertModel<typeof posts>;



export const galleries = createTable('galleries', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  image_url: text('image_url'),
});

export type Gallery_Select = InferSelectModel<typeof galleries>;
export type Gallery_Insert = InferInsertModel<typeof galleries>;