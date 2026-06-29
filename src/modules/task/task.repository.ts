import { query } from "../../config/database";
import type { TaskRow } from "../../types";

export function create(userId: string, title: string, category: string) {
  return query<TaskRow>(
    `INSERT INTO tasks (user_id, title, category) VALUES ($1, $2, $3) RETURNING *`,
    [userId, title, category],
  );
}

export function findAllByUser(userId: string) {
  return query<TaskRow>(
    "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
    [userId],
  );
}

export function findById(id: string) {
  return query<TaskRow>("SELECT * FROM tasks WHERE id = $1", [id]);
}

export function remove(id: string) {
  return query("DELETE FROM tasks WHERE id = $1 RETURNING id", [id]);
}
