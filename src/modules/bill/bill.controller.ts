import type { Request, Response } from "express";
import * as billService from "./bill.service";

const VALID_CATEGORIES = [
  "Utility", "Housing", "Transport", "Food",
  "Health", "Insurance", "Subscription", "Other",
] as const;

export async function create(req: Request, res: Response) {
  const { name, amount, due_date, due_time, category } = req.body as Record<string, unknown>;

  const errors: string[] = [];

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push("Name is required");
  }
  if (!amount || typeof amount !== "string" || isNaN(Number(amount))) {
    errors.push("Valid amount is required");
  }
  if (!due_date || typeof due_date !== "string") {
    errors.push("Due date is required");
  }
  if (!category || !VALID_CATEGORIES.includes(category as typeof VALID_CATEGORIES[number])) {
    errors.push("Valid category is required");
  }

  if (errors.length > 0) {
    res.status(400).json({ error: errors.join("; ") });
    return;
  }

  const bill = await billService.createBill(
    req.user!.userId,
    (name as string).trim(),
    amount as string,
    due_date as string,
    (due_time as string | undefined) ?? null,
    category as string,
  );
  res.status(201).json({ bill });
}

export async function list(_req: Request, res: Response) {
  const result = await billService.getUserBills(_req.user!.userId);
  res.json(result);
}

export async function updateStatus(req: Request, res: Response) {
  const { status } = req.body as { status?: string };

  if (status !== "paid" && status !== "unpaid") {
    res.status(400).json({ error: "Status must be 'paid' or 'unpaid'" });
    return;
  }

  try {
    const bill = await billService.updateBillStatus(
      req.params.id as string,
      req.user!.userId,
      status,
    );
    res.json({ bill });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const httpStatus = message === "Bill not found" ? 404 : 403;
    res.status(httpStatus).json({ error: message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await billService.deleteBill(req.params.id as string, req.user!.userId);
    res.status(204).end();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const httpStatus = message === "Bill not found" ? 404 : 403;
    res.status(httpStatus).json({ error: message });
  }
}
