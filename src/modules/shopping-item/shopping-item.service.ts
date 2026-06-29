import { query } from "../../config/database";
import * as shoppingItemRepository from "./shopping-item.repository";

async function listBelongsToUser(listId: string, userId: string): Promise<boolean> {
  const { rows } = await query<{ id: string }>(
    "SELECT id FROM shopping_lists WHERE id = $1 AND user_id = $2",
    [listId, userId],
  );
  return rows.length > 0;
}

async function itemBelongsToUser(itemId: string, userId: string): Promise<boolean> {
  const { rows } = await query<{ id: string }>(
    `SELECT si.id FROM shopping_items si
     JOIN shopping_lists sl ON sl.id = si.shopping_list_id
     WHERE si.id = $1 AND sl.user_id = $2`,
    [itemId, userId],
  );
  return rows.length > 0;
}

export async function createItem(listId: string, userId: string, name: string) {
  const owned = await listBelongsToUser(listId, userId);
  if (!owned) throw new Error("Shopping list not found");

  const { rows } = await shoppingItemRepository.create(listId, name);
  const item = rows[0];
  if (!item) throw new Error("Failed to create item");
  return item;
}

export async function getListItems(listId: string, userId: string) {
  const owned = await listBelongsToUser(listId, userId);
  if (!owned) throw new Error("Shopping list not found");

  const { rows } = await shoppingItemRepository.findByList(listId);
  return rows;
}

export async function renameItem(itemId: string, userId: string, name: string) {
  const owned = await itemBelongsToUser(itemId, userId);
  if (!owned) throw new Error("Item not found");

  const result = await shoppingItemRepository.updateName(itemId, name);
  return result.rows[0]!;
}

export async function deleteItem(itemId: string, userId: string) {
  const owned = await itemBelongsToUser(itemId, userId);
  if (!owned) throw new Error("Item not found");

  await shoppingItemRepository.remove(itemId);
}
