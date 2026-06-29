import type { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`ALTER TABLE shopping_items DROP COLUMN bought;`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`ALTER TABLE shopping_items ADD COLUMN bought BOOLEAN NOT NULL DEFAULT false;`);
}
