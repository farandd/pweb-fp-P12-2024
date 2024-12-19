export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  username: string;
  password: string;
  role: Role;
}

export interface Item {
  name: string;
  amount: string;
  condition: string;
  created_at: Date;
}

export interface BorrowItem {
  item_name: string;
  amount: string;
  borrow_date: Date;
  return_date: Date;
  borrower_name: string;
  officer_name: string;
}