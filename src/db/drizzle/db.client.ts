import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

export const sqlite = new Database('src/db/drizzle/db.sqlite');
export const db = drizzle(sqlite, { schema });
