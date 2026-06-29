import type { Request, Response } from "express";
import * as shoppingListService from "./shopping-list.service";

export async function create(req: Request, res: Response) {
  const { title } = req.body as { title?: string };

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  const list = await shoppingListService.createList(req.user!.userId, title.trim());
  res.status(201).json({ list });
}

export async function list(_req: Request, res: Response) {
  const lists = await shoppingListService.getUserLists(_req.user!.userId);
  res.json({ lists });
}

export async function rename(req: Request, res: Response) {
  const { title } = req.body as { title?: string };

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  try {
    const list = await shoppingListService.renameList(
      req.params.id as string,
      req.user!.userId,
      title.trim(),
    );
    res.json({ list });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const status = message === "Shopping list not found" ? 404 : 403;
    res.status(status).json({ error: message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await shoppingListService.deleteList(req.params.id as string, req.user!.userId);
    res.status(204).end();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const status = message === "Shopping list not found" ? 404 : 403;
    res.status(status).json({ error: message });
  }
}
