
import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType, CategoriesState } from '../types';
import { PlusCircle } from 'lucide-react';

interface TransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
  categories: CategoriesState;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAdd, categories }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const currentCats = type === 'income' ? categories.income : categories.expense;
    if (currentCats.length > 0) {
      setCategory(currentCats[0]);
    }
  }, [type, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0 || !category) return;

    onAdd({
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date(date).toISOString(),
    });

    setDescription('');
    setAmount('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center gap-2">
        <PlusCircle size={20} className="text-blue-500" />
        Nuevo Movimiento
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Tipo</label>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                type === 'income' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'
              }`}
            >
              Ingreso
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                type === 'expense' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500'
              }`}
            >
              Gasto
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Descripción</label>
          <input
            type="text"
            required
            placeholder="Ej. Compra supermercado"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Monto (€)</label>
            <input
              type="number"
              required
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Fecha</label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Categoría</label>
          <select
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {(type === 'income' ? categories.income : categories.expense).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm"
        >
          Agregar Movimiento
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
