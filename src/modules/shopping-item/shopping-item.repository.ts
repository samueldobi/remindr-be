import { query } from "../../config/database";
import type { ShoppingItemRow } from "../../types";

export function create(shoppingListId: string, name: string) {
  return query<ShoppingItemRow>(
    `INSERT INTO shopping_items (shopping_list_id, name) VALUES ($1, $2) RETURNING *`,
    [shoppingListId, name],
  );
}

export function findByList(shoppingListId: string) {
  return query<ShoppingItemRow>(
    "SELECT * FROM shopping_items WHERE shopping_list_id = $1 ORDER BY created_at",
    [shoppingListId],
  );
}

export function findById(id: string) {
  return query<ShoppingItemRow>("SELECT * FROM shopping_items WHERE id = $1", [id]);
}

export function updateName(id: string, name: string) {
  return query<ShoppingItemRow>(
    `UPDATE shopping_items SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
    [name, id],
  );
}

export function remove(id: string) {
  return query("DELETE FROM shopping_items WHERE id = $1 RETURNING id", [id]);
}
