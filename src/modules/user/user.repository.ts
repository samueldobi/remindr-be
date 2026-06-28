import { query } from "../../config/database";

export interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export function findByEmail(email: string) {
  return query("SELECT * FROM users WHERE email = $1", [email]);
}

export function findById(id: string) {
  return query("SELECT * FROM users WHERE id = $1", [id]);
}

export function create(data: Pick<UserRow, "name" | "email" | "password_hash">) {
  return query(
    `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *`,
    [data.name, data.email, data.password_hash],
  );
}
