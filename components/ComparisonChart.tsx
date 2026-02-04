
import React from 'react';
import { formatCurrency } from '../utils/helpers';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface ComparisonChartProps {
  income: number;
  expense: number;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ income, expense }) => {
  const hasData = income > 0 || expense > 0;
  const maxValue = Math.max(income, expense, 1);
  const incomeWidth = (income / maxValue) * 100;
  const expenseWidth = (expense / maxValue) * 100;

  if (!hasData) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 flex items-center justify-center min-h-[120px] text-slate-400 italic text-sm">
        Agregue movimientos para ver la comparativa.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Comparativa de Flujo</h2>
        <p className="text-xs text-slate-400">Escala relativa entre ingresos y gastos</p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 font-medium text-slate-700">
              <ArrowUpCircle size={16} className="text-emerald-500" />
              <span>Ingresos</span>
            </div>
            <span className="font-bold text-emerald-600">{formatCurrency(income)}</span>
          </div>
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              style={{ width: `${incomeWidth}%` }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 font-medium text-slate-700">
              <ArrowDownCircle size={16} className="text-rose-500" />
              <span>Gastos</span>
            </div>
            <span className="font-bold text-rose-600">{formatCurrency(expense)}</span>
          </div>
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-rose-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(244,63,94,0.2)]"
              style={{ width: `${expenseWidth}%` }}
            />
          </div>
        </div>
      </div>
      {income > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-50 flex justify-center">
          <p className="text-xs text-slate-500">
            Los gastos representan el <span className="font-bold text-slate-700">{((expense / income) * 100).toFixed(1)}%</span> de tus ingresos totales.
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparisonChart;
