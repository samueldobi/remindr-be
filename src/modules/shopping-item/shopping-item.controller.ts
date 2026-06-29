import type { Request, Response } from "express";
import * as shoppingItemService from "./shopping-item.service";

export async function create(req: Request, res: Response) {
  const { name } = req.body as { name?: string };

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  try {
    const item = await shoppingItemService.createItem(
      req.params.listId as string,
      req.user!.userId,
      name.trim(),
    );
    res.status(201).json({ item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(404).json({ error: message });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const items = await shoppingItemService.getListItems(
      req.params.listId as string,
      req.user!.userId,
    );
    res.json({ items });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(404).json({ error: message });
  }
}

export async function rename(req: Request, res: Response) {
  const { name } = req.body as { name?: string };

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  try {
    const item = await shoppingItemService.renameItem(
      req.params.id as string,
      req.user!.userId,
      name.trim(),
    );
    res.json({ item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(404).json({ error: message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await shoppingItemService.deleteItem(req.params.id as string, req.user!.userId);
    res.status(204).end();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(404).json({ error: message });
  }
}
