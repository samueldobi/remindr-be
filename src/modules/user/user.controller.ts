import type { Request, Response } from "express";
import * as userService from "./user.service";
import type { UserRow } from "../../types";

function stripUser(user: UserRow): Omit<UserRow, "password_hash"> {
  const { password_hash: _, ...safe } = user;
  return safe;
}

export async function getProfile(req: Request, res: Response) {
  const user = await userService.getProfile(req.params.id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json({ user: stripUser(user) });
}
