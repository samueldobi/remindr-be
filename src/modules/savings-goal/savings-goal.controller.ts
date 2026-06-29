import type { Request, Response } from "express";
import * as savingsGoalService from "./savings-goal.service";

export async function create(req: Request, res: Response) {
  const { title, target_amount } = req.body as Record<string, unknown>;

  const errors: string[] = [];

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    errors.push("Title is required");
  }
  if (!target_amount || typeof target_amount !== "string" || isNaN(Number(target_amount))) {
    errors.push("Valid target amount is required");
  }

  if (errors.length > 0) {
    res.status(400).json({ error: errors.join("; ") });
    return;
  }

  const goal = await savingsGoalService.createGoal(
    req.user!.userId,
    (title as string).trim(),
    target_amount as string,
  );
  res.status(201).json({ goal });
}

export async function list(_req: Request, res: Response) {
  const goals = await savingsGoalService.getUserGoals(_req.user!.userId);
  res.json({ goals });
}

export async function update(req: Request, res: Response) {
  const { title, target_amount, current_amount } = req.body as Record<string, unknown>;

  const fields: { title?: string; targetAmount?: string; currentAmount?: string } = {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      res.status(400).json({ error: "Title must be a non-empty string" });
      return;
    }
    fields.title = title.trim();
  }

  if (target_amount !== undefined) {
    if (typeof target_amount !== "string" || isNaN(Number(target_amount))) {
      res.status(400).json({ error: "Target amount must be a valid number" });
      return;
    }
    fields.targetAmount = target_amount;
  }

  if (current_amount !== undefined) {
    if (typeof current_amount !== "string" || isNaN(Number(current_amount))) {
      res.status(400).json({ error: "Current amount must be a valid number" });
      return;
    }
    if (Number(current_amount) < 0) {
      res.status(400).json({ error: "Current amount cannot be negative" });
      return;
    }
    fields.currentAmount = current_amount;
  }

  if (Object.keys(fields).length === 0) {
    res.status(400).json({ error: "At least one field to update is required" });
    return;
  }

  try {
    const goal = await savingsGoalService.updateGoal(
      req.params.id as string,
      req.user!.userId,
      fields,
    );
    res.json({ goal });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const status = message === "Savings goal not found" ? 404 : message.includes("exceed") ? 400 : 403;
    res.status(status).json({ error: message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await savingsGoalService.deleteGoal(req.params.id as string, req.user!.userId);
    res.status(204).end();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const status = message === "Savings goal not found" ? 404 : 403;
    res.status(status).json({ error: message });
  }
}
