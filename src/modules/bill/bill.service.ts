import * as billRepository from "./bill.repository";

export async function createBill(
  userId: string,
  name: string,
  amount: string,
  dueDate: string,
  dueTime: string | null,
  category: string,
) {
  const { rows } = await billRepository.create(userId, name, amount, dueDate, dueTime, category);
  const bill = rows[0];
  if (!bill) throw new Error("Failed to create bill");
  return bill;
}

export async function getUserBills(userId: string) {
  const [billsResult, countResult] = await Promise.all([
    billRepository.findAllByUser(userId),
    billRepository.countByUser(userId),
  ]);
  return { bills: billsResult.rows, total: countResult.rows[0]!.count };
}

export async function updateBillStatus(billId: string, userId: string, status: "paid" | "unpaid") {
  const { rows } = await billRepository.findById(billId);
  const bill = rows[0];
  if (!bill) throw new Error("Bill not found");
  if (bill.user_id !== userId) throw new Error("Not authorized to update this bill");

  const result = await billRepository.updateStatus(billId, status);
  return result.rows[0]!;
}

export async function deleteBill(billId: string, userId: string) {
  const { rows } = await billRepository.findById(billId);
  const bill = rows[0];
  if (!bill) throw new Error("Bill not found");
  if (bill.user_id !== userId) throw new Error("Not authorized to delete this bill");

  await billRepository.remove(billId);
}
