import { query } from "../../config/database";
import type { ShoppingListRow } from "../../types";

export function create(userId: string, title: string) {
  return query<ShoppingListRow>(
    `INSERT INTO shopping_lists (user_id, title) VALUES ($1, $2) RETURNING *`,
    [userId, title],
  );
}

export function findAllByUser(userId: string) {
  return query<ShoppingListRow>(
    "SELECT * FROM shopping_lists WHERE user_id = $1 ORDER BY created_at DESC",
    [userId],
  );
}

export function findById(id: string) {
  return query<ShoppingListRow>("SELECT * FROM shopping_lists WHERE id = $1", [id]);
}

export function updateTitle(id: string, title: string) {
  return query<ShoppingListRow>(
    `UPDATE shopping_lists SET title = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
    [title, id],
  );
}

export function remove(id: string) {
  return query("DELETE FROM shopping_lists WHERE id = $1 RETURNING id", [id]);
}
