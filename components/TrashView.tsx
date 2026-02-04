
import React from 'react';
import { DeletedTransaction } from '../types';
import { formatCurrency } from '../utils/helpers';
import { RotateCcw, AlertCircle } from 'lucide-react';

interface TrashViewProps {
  deletedTransactions: DeletedTransaction[];
  onRestore: (id: string) => void;
}

const TrashView: React.FC<TrashViewProps> = ({ deletedTransactions, onRestore }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Movimientos Eliminados</h2>
        <p className="text-slate-500">Auditoría de eliminaciones y papelera de reciclaje.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Info Movimiento</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha Eliminación</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Motivo</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Monto</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {deletedTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle size={32} className="text-slate-200" />
                    <p>La papelera está vacía.</p>
                  </div>
                </td>
              </tr>
            ) : (
              deletedTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-700">{t.description}</span>
                      <span className="text-xs text-slate-400">{t.category} • {new Date(t.date).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500">{new Date(t.deletedAt).toLocaleString()}</td>
                  <td className="px-6 py-5 text-sm">
                    <span className="italic text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">"{t.deletionReason}"</span>
                  </td>
                  <td className={`px-6 py-5 text-right font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => onRestore(t.id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <RotateCcw size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrashView;
