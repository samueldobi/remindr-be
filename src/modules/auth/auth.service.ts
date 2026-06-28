import bcrypt from "bcrypt";
import * as authRepository from "./auth.repository";
import type { UserRow } from "../../types";

export async function register(name: string, email: string, password: string) {
  const existing = await authRepository.findByEmail(email);
  if (existing.rows[0]) {
    throw new Error("Email already in use");
  }

  const password_hash = await bcrypt.hash(password, 10);
  const result = await authRepository.createUser({ name, email, password_hash });
  const user = result.rows[0];
  if (!user) {
    throw new Error("Failed to create user");
  }

  return user;
}

export async function login(email: string, password: string): Promise<UserRow> {
  const result = await authRepository.findByEmail(email);
  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new Error("Invalid email or password");
  }

  return user;
}
