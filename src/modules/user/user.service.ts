import * as userRepository from "./user.repository";

export async function getProfile(id: string) {
  const result = await userRepository.findById(id);
  return result.rows[0] ?? null;
}
