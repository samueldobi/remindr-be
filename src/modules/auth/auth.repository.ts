import { query } from "../../config/database";
import type { UserRow, RefreshTokenRow } from "../../types";

export async function findByEmail(email: string) {
  return query<UserRow>("SELECT * FROM users WHERE email = $1", [email]);
}

export async function createUser(data: Pick<UserRow, "name" | "email" | "password_hash">) {
  return query<UserRow>(
    `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *`,
    [data.name, data.email, data.password_hash],
  );
}

export async function createRefreshToken(userId: string, tokenHash: string, expiresAt: Date) {
  return query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3) RETURNING *`,
    [userId, tokenHash, expiresAt],
  );
}

export async function findRefreshToken(tokenHash: string) {
  return query<RefreshTokenRow>(
    "SELECT * FROM refresh_tokens WHERE token_hash = $1 AND expires_at > NOW()",
    [tokenHash],
  );
}

export async function deleteRefreshToken(tokenHash: string) {
  return query("DELETE FROM refresh_tokens WHERE token_hash = $1", [tokenHash]);
}

export async function deleteUserRefreshTokens(userId: string) {
  return query("DELETE FROM refresh_tokens WHERE user_id = $1", [userId]);
}
