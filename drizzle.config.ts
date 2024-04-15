import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/drizzle/schema.ts',
  out: './src/db/drizzle/migrations',
  driver: 'better-sqlite', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: './src/db/drizzle/db.sqlite',
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
} satisfies Config;