import type { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    CREATE TABLE shopping_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      shopping_list_id UUID NOT NULL REFERENCES shopping_lists(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      bought BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`DROP TABLE IF EXISTS shopping_items;`);
}
