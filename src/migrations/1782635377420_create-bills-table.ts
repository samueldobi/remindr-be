import type { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`CREATE TYPE bill_category AS ENUM ('Utility', 'Housing', 'Transport', 'Food', 'Health', 'Insurance', 'Subscription', 'Other');`);
  pgm.sql(`CREATE TYPE bill_status AS ENUM ('paid', 'unpaid');`);

  pgm.sql(`
    CREATE TABLE bills (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      amount NUMERIC(12, 2) NOT NULL,
      due_date DATE NOT NULL,
      due_time TIME,
      category bill_category NOT NULL,
      status bill_status NOT NULL DEFAULT 'unpaid',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`DROP TABLE IF EXISTS bills;`);
  pgm.sql(`DROP TYPE IF EXISTS bill_status;`);
  pgm.sql(`DROP TYPE IF EXISTS bill_category;`);
}
