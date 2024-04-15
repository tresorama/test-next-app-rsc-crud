import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db, sqlite } from "./db.client";

(async () => {
  try {
    console.log('Applying migrations ...!');

    migrate(db, { migrationsFolder: "src/db/drizzle/migrations" });
    sqlite.close();

    console.log('Done ...!');
    process.exit(0);
  } catch (error) {
    console.log('Error!');
    console.error(error);
    process.exit(1);
  }
})();

