import { query } from "../../config/database";
import type { UserRow } from "../../types";

export function findById(id: string) {
  return query<UserRow>("SELECT * FROM users WHERE id = $1", [id]);
}
