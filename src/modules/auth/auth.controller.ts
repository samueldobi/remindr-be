import type { Request, Response } from "express";
import * as authService from "./auth.service";
import * as schemas from "./auth.schemas";
import type { UserRow } from "../../types";

function stripUser(user: UserRow): Omit<UserRow, "password_hash"> {
  const { password_hash: _, ...safe } = user;
  return safe;
}

export async function register(req: Request, res: Response) {
  const parsed = schemas.registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues });
    return;
  }

  try {
    const { accessToken, refreshToken, user } = await authService.register(
      parsed.data.name,
      parsed.data.email,
      parsed.data.password,
    );
    res.status(201).json({ accessToken, refreshToken, user: stripUser(user) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ error: message });
  }
}

export async function login(req: Request, res: Response) {
  const parsed = schemas.loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues });
    return;
  }

  try {
    const { accessToken, refreshToken, user } = await authService.login(
      parsed.data.email,
      parsed.data.password,
    );
    res.json({ accessToken, refreshToken, user: stripUser(user) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(401).json({ error: message });
  }
}

export async function refresh(req: Request, res: Response) {
  const parsed = schemas.refreshSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues });
    return;
  }

  try {
    const tokens = await authService.refresh(parsed.data.refreshToken);
    res.json(tokens);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(401).json({ error: message });
  }
}

export async function logout(req: Request, res: Response) {
  await authService.logout(req.user!.userId);
  res.status(204).end();
}
