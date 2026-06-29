import * as shoppingListRepository from "./shopping-list.repository";

export async function createList(userId: string, title: string) {
  const { rows } = await shoppingListRepository.create(userId, title);
  const list = rows[0];
  if (!list) throw new Error("Failed to create shopping list");
  return list;
}

export async function getUserLists(userId: string) {
  const { rows } = await shoppingListRepository.findAllByUser(userId);
  return rows;
}

export async function renameList(listId: string, userId: string, title: string) {
  const { rows } = await shoppingListRepository.findById(listId);
  const list = rows[0];
  if (!list) throw new Error("Shopping list not found");
  if (list.user_id !== userId) throw new Error("Not authorized to rename this list");

  const result = await shoppingListRepository.updateTitle(listId, title);
  return result.rows[0]!;
}

export async function deleteList(listId: string, userId: string) {
  const { rows } = await shoppingListRepository.findById(listId);
  const list = rows[0];
  if (!list) throw new Error("Shopping list not found");
  if (list.user_id !== userId) throw new Error("Not authorized to delete this list");

  await shoppingListRepository.remove(listId);
}
