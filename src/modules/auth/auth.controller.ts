import type { Request, Response } from "express";
import { z } from "zod";
import * as authService from "./auth.service";
import type { UserRow } from "../../types";

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

function stripUser(user: UserRow): Omit<UserRow, "password_hash"> {
  const { password_hash: _, ...safe } = user;
  return safe;
}

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues });
    return;
  }

  const { name, email, password } = parsed.data;

  try {
    const user = await authService.register(name, email, password);
    res.status(201).json({ user: stripUser(user) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ error: message });
  }
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues });
    return;
  }

  const { email, password } = parsed.data;

  try {
    const user = await authService.login(email, password);
    res.json({ user: stripUser(user) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(401).json({ error: message });
  }
}

export async function refresh(req: Request, res: Response) {
  res.json({ message: "Not implemented yet" });
}

export async function logout(req: Request, res: Response) {
  res.json({ message: "Not implemented yet" });
}
