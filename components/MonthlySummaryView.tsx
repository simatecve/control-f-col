
import React from 'react';
import { Transaction, MonthlyBalance } from '../types';
import { formatCurrency } from '../utils/helpers';
import { CalendarDays, TrendingUp, TrendingDown } from 'lucide-react';

interface MonthlySummaryViewProps {
  transactions: Transaction[];
}

const MonthlySummaryView: React.FC<MonthlySummaryViewProps> = ({ transactions }) => {
  const monthlyData = transactions.reduce((acc, tx) => {
    const d = new Date(tx.date);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthKey, income: 0, expense: 0, balance: 0 };
    }
    
    if (tx.type === 'income') acc[monthKey].income += tx.amount;
    else acc[monthKey].expense += tx.amount;
    
    acc[monthKey].balance = acc[monthKey].income - acc[monthKey].expense;
    return acc;
  }, {} as Record<string, MonthlyBalance>);

  const sortedMonths = (Object.values(monthlyData) as MonthlyBalance[]).sort((a, b) => b.month.localeCompare(a.month));

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Historial Mensual Consolidados</h2>
        <p className="text-slate-500">Resumen total de ingresos y gastos agrupados por mes.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Mes / Año</th>
              <th className="px-6 py-4 text-xs font-bold text-emerald-600 uppercase tracking-wider text-right">Ingresos (+)</th>
              <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider text-right">Gastos (-)</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Balance Neto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sortedMonths.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">No hay datos suficientes para generar un historial.</td>
              </tr>
            ) : (
              sortedMonths.map((m) => {
                const [year, month] = m.month.split('-');
                const dateLabel = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(new Date(parseInt(year), parseInt(month) - 1));
                
                return (
                  <tr key={m.month} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                          <CalendarDays size={18} />
                        </div>
                        <span className="font-semibold text-slate-700 capitalize">{dateLabel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right font-medium text-emerald-600">
                      {formatCurrency(m.income)}
                    </td>
                    <td className="px-6 py-5 text-right font-medium text-rose-600">
                      {formatCurrency(m.expense)}
                    </td>
                    <td className={`px-6 py-5 text-right font-bold ${m.balance >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                      <div className="flex items-center justify-end gap-1">
                        {m.balance >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        {formatCurrency(m.balance)}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlySummaryView;
