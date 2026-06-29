import * as savingsGoalRepository from "./savings-goal.repository";

export async function createGoal(userId: string, title: string, targetAmount: string) {
  const { rows } = await savingsGoalRepository.create(userId, title, targetAmount);
  const goal = rows[0];
  if (!goal) throw new Error("Failed to create savings goal");
  return goal;
}

export async function getUserGoals(userId: string) {
  const { rows } = await savingsGoalRepository.findAllByUser(userId);
  return rows;
}

export async function updateGoal(
  goalId: string,
  userId: string,
  fields: { title?: string; targetAmount?: string; currentAmount?: string },
) {
  const { rows } = await savingsGoalRepository.findById(goalId);
  const goal = rows[0];
  if (!goal) throw new Error("Savings goal not found");
  if (goal.user_id !== userId) throw new Error("Not authorized to update this goal");

  const currentAmount = fields.currentAmount ?? goal.current_amount;
  const targetAmount = fields.targetAmount ?? goal.target_amount;

  if (Number(currentAmount) > Number(targetAmount)) {
    throw new Error("Current amount cannot exceed target amount");
  }

  const result = await savingsGoalRepository.update(goalId, userId, fields);
  return result.rows[0]!;
}

export async function deleteGoal(goalId: string, userId: string) {
  const { rows } = await savingsGoalRepository.findById(goalId);
  const goal = rows[0];
  if (!goal) throw new Error("Savings goal not found");
  if (goal.user_id !== userId) throw new Error("Not authorized to delete this goal");

  await savingsGoalRepository.remove(goalId);
}
