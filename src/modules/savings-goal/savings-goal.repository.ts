import { query } from "../../config/database";
import type { SavingsGoalRow } from "../../types";

export function create(userId: string, title: string, targetAmount: string) {
  return query<SavingsGoalRow>(
    `INSERT INTO savings_goals (user_id, title, target_amount) VALUES ($1, $2, $3) RETURNING *`,
    [userId, title, targetAmount],
  );
}

export function findAllByUser(userId: string) {
  return query<SavingsGoalRow>(
    "SELECT * FROM savings_goals WHERE user_id = $1 ORDER BY created_at DESC",
    [userId],
  );
}

export function findById(id: string) {
  return query<SavingsGoalRow>("SELECT * FROM savings_goals WHERE id = $1", [id]);
}

export function update(id: string, userId: string, fields: {
  title?: string;
  targetAmount?: string;
  currentAmount?: string;
}) {
  return query<SavingsGoalRow>(
    `UPDATE savings_goals SET
      title = COALESCE($1, title),
      target_amount = COALESCE($2::numeric, target_amount),
      current_amount = COALESCE($3::numeric, current_amount),
      updated_at = CURRENT_TIMESTAMP
     WHERE id = $4 AND user_id = $5 RETURNING *`,
    [fields.title ?? null, fields.targetAmount ?? null, fields.currentAmount ?? null, id, userId],
  );
}

export function remove(id: string) {
  return query("DELETE FROM savings_goals WHERE id = $1 RETURNING id", [id]);
}
