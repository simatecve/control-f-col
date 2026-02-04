
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string; // ISO string
}

export interface DeletedTransaction extends Transaction {
  deletedAt: string;
  deletionReason: string;
}

export interface MonthlyBalance {
  month: string; // "YYYY-MM"
  income: number;
  expense: number;
  balance: number;
}

export interface CategoriesState {
  income: string[];
  expense: string[];
}

export const DEFAULT_CATEGORIES: CategoriesState = {
  income: ['Salario', 'Freelance', 'Inversiones', 'Regalo', 'Otros'],
  expense: ['Comida', 'Alquiler', 'Transporte', 'Entretenimiento', 'Salud', 'Educación', 'Servicios', 'Otros']
};
