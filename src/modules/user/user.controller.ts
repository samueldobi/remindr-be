import type { Request, Response } from "express";
import * as userService from "./user.service";

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await userService.register(name, email, password);
    res.status(201).json({ user });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ error: message });
  }
}

export async function getProfile(req: Request, res: Response) {
  const user = await userService.getProfile(req.params.id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json({ user });
}
