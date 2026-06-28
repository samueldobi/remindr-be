import * as userRepository from "./user.repository";

export async function register(name: string, email: string, passwordHash: string) {
  const existing = await userRepository.findByEmail(email);
  if (existing.rows[0]) {
    throw new Error("Email already in use");
  }

  const result = await userRepository.create({ name, email, password_hash: passwordHash });
  return result.rows[0]!;
}

export async function getProfile(id: string) {
  const result = await userRepository.findById(id);
  return result.rows[0] ?? null;
}
