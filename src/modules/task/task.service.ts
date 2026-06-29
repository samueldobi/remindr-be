import * as taskRepository from "./task.repository";

export async function createTask(userId: string, title: string, category: string) {
  const { rows } = await taskRepository.create(userId, title, category);
  const task = rows[0];
  if (!task) throw new Error("Failed to create task");
  return task;
}

export async function getUserTasks(userId: string) {
  const { rows } = await taskRepository.findAllByUser(userId);
  return rows;
}

export async function deleteTask(taskId: string, userId: string) {
  const { rows } = await taskRepository.findById(taskId);
  const task = rows[0];
  if (!task) throw new Error("Task not found");
  if (task.user_id !== userId) throw new Error("Not authorized to delete this task");

  await taskRepository.remove(taskId);
}
