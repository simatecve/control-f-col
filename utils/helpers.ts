
import { Transaction } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export const getMonthName = (dateStr: string): string => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
};

export const getAvailableMonths = (transactions: Transaction[]) => {
  const months = transactions.map(t => {
    const d = new Date(t.date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });
  return Array.from(new Set(months)).sort().reverse();
};

export const calculateTotals = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'income') acc.income += curr.amount;
      else acc.expense += curr.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );
};
