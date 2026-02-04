
import React from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/helpers';
import { Trash2, Calendar } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  selectedMonth: string;
  availableMonths: string[];
  onMonthChange: (month: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
  selectedMonth,
  availableMonths,
  onMonthChange
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-1 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Historial de Movimientos</h2>
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <Calendar size={16} className="text-slate-400" />
          <select
            className="bg-transparent text-sm font-medium text-slate-600 focus:outline-none"
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
          >
            <option value="all">Todos los meses</option>
            {availableMonths.map((m) => {
              const [year, month] = m.split('-');
              const dateName = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(new Date(parseInt(year), parseInt(month) - 1));
              return <option key={m} value={m}>{dateName}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[500px] flex-1">
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p>No hay movimientos registrados para este período.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100">
                <th className="pb-3 pl-2">Fecha</th>
                <th className="pb-3">Descripción</th>
                <th className="pb-3">Categoría</th>
                <th className="pb-3 text-right">Monto</th>
                <th className="pb-3 text-right pr-2">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 pl-2 text-sm text-slate-500">{new Date(t.date).toLocaleDateString('es-ES')}</td>
                  <td className="py-4 font-medium text-slate-700 text-sm">{t.description}</td>
                  <td className="py-4 text-sm">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs">{t.category}</span>
                  </td>
                  <td className={`py-4 text-right font-bold text-sm ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  <td className="py-4 text-right pr-2">
                    <button
                      onClick={() => onDelete(t.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
