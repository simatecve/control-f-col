
import React from 'react';
import { formatCurrency } from '../utils/helpers';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

interface SummaryCardsProps {
  income: number;
  expense: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ income, expense }) => {
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
          <ArrowUpCircle size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Ingresos Totales</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(income)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
          <ArrowDownCircle size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Gastos Totales</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(expense)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
          <Wallet size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Saldo Neto</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {formatCurrency(balance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
