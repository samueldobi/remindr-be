import type { Request, Response } from "express";
import * as taskService from "./task.service";

export async function create(req: Request, res: Response) {
  const { title, category } = req.body as { title?: string; category?: string };

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  const task = await taskService.createTask(req.user!.userId, title.trim(), category ?? "general");
  res.status(201).json({ task });
}

export async function list(req: Request, res: Response) {
  const tasks = await taskService.getUserTasks(req.user!.userId);
  res.json({ tasks });
}

export async function remove(req: Request, res: Response) {
  try {
    await taskService.deleteTask(req.params.id as string, req.user!.userId);
    res.status(204).end();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const status = message === "Task not found" ? 404 : 403;
    res.status(status).json({ error: message });
  }
}
