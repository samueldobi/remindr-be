export interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface SavingsGoalRow {
  id: string;
  user_id: string;
  title: string;
  target_amount: string;
  current_amount: string;
  created_at: Date;
  updated_at: Date;
}

export interface BillRow {
  id: string;
  user_id: string;
  name: string;
  amount: string;
  due_date: string;
  due_time: string | null;
  category: string;
  status: "paid" | "unpaid";
  created_at: Date;
  updated_at: Date;
}

export interface ShoppingListRow {
  id: string;
  user_id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export interface ShoppingItemRow {
  id: string;
  shopping_list_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface TaskRow {
  id: string;
  user_id: string;
  title: string;
  category: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface RefreshTokenRow {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  created_at: Date;
}
