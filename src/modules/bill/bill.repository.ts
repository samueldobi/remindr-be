import { query } from "../../config/database";
import type { BillRow } from "../../types";

export function create(
  userId: string,
  name: string,
  amount: string,
  dueDate: string,
  dueTime: string | null,
  category: string,
) {
  return query<BillRow>(
    `INSERT INTO bills (user_id, name, amount, due_date, due_time, category)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [userId, name, amount, dueDate, dueTime, category],
  );
}

export function findAllByUser(userId: string) {
  return query<BillRow>(
    "SELECT * FROM bills WHERE user_id = $1 ORDER BY due_date ASC",
    [userId],
  );
}

export function countByUser(userId: string) {
  return query<{ count: number }>(
    "SELECT COUNT(*)::int AS count FROM bills WHERE user_id = $1",
    [userId],
  );
}

export function findById(id: string) {
  return query<BillRow>("SELECT * FROM bills WHERE id = $1", [id]);
}

export function updateStatus(id: string, status: "paid" | "unpaid") {
  return query<BillRow>(
    `UPDATE bills SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
    [status, id],
  );
}

export function remove(id: string) {
  return query("DELETE FROM bills WHERE id = $1 RETURNING id", [id]);
}
