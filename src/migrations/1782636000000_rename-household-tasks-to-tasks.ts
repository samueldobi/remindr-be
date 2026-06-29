import type { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`ALTER TABLE household_tasks RENAME TO tasks;`);
  pgm.sql(`ALTER TABLE tasks DROP COLUMN status;`);
  pgm.sql(`DROP TYPE IF EXISTS task_status;`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`CREATE TYPE task_status AS ENUM ('urgent', 'pending', 'in_progress');`);
  pgm.sql(`ALTER TABLE tasks ADD COLUMN status task_status NOT NULL DEFAULT 'pending';`);
  pgm.sql(`ALTER TABLE tasks RENAME TO household_tasks;`);
}
